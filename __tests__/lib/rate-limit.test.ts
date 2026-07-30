/**
 * getClientIp is the subject on which every IP-keyed rate limit in the app is
 * bucketed, including the 5/hour protecting the six digit admin PIN. If a
 * caller can vary it, they get a fresh bucket per request and none of those
 * limits exist. It read the leftmost X-Forwarded-For entry until 2026-07-29,
 * which is the caller's own value, so these tests exist to keep the choice of
 * hop from drifting back.
 */

import { getClientIp } from "@/lib/rate-limit";
import type { NextRequest } from "next/server";

/** Minimal stand-in: getClientIp only ever reads request.headers. */
function requestWith(headers: Record<string, string>): NextRequest {
  return { headers: new Headers(headers) } as unknown as NextRequest;
}

describe("getClientIp", () => {
  it("takes the rightmost forwarded hop, not the caller-supplied leftmost one", () => {
    // The caller sent "1.2.3.4"; our proxy appended what it actually saw.
    const req = requestWith({ "x-forwarded-for": "1.2.3.4, 203.0.113.9" });
    expect(getClientIp(req)).toBe("203.0.113.9");
  });

  it("gives a spoofing caller the same bucket every time", () => {
    const first = getClientIp(
      requestWith({ "x-forwarded-for": "10.0.0.1, 203.0.113.9" }),
    );
    const second = getClientIp(
      requestWith({ "x-forwarded-for": "10.0.0.99, 203.0.113.9" }),
    );
    // Varying their own entry must not move them to a fresh limit row.
    expect(first).toBe(second);
  });

  it("ignores cf-connecting-ip by default, because nothing sets it here", () => {
    // Production answers from railway-edge with no Cloudflare in front, so this
    // header is caller-supplied and trusting it would restore the bypass under
    // a different name.
    const req = requestWith({
      "cf-connecting-ip": "198.51.100.7",
      "x-forwarded-for": "1.2.3.4, 203.0.113.9",
    });
    expect(getClientIp(req)).toBe("203.0.113.9");
  });

  it("honours cf-connecting-ip only when an ingress is declared to set it", () => {
    const previous = process.env.TRUST_CF_CONNECTING_IP;
    process.env.TRUST_CF_CONNECTING_IP = "true";
    try {
      const req = requestWith({
        "cf-connecting-ip": "198.51.100.7",
        // Behind Cloudflare the rightmost hop is a shared edge address, which
        // would bucket unrelated visitors together.
        "x-forwarded-for": "1.2.3.4, 172.68.0.1",
      });
      expect(getClientIp(req)).toBe("198.51.100.7");
    } finally {
      if (previous === undefined) delete process.env.TRUST_CF_CONNECTING_IP;
      else process.env.TRUST_CF_CONNECTING_IP = previous;
    }
  });

  it("handles a single-hop forwarded header", () => {
    expect(getClientIp(requestWith({ "x-forwarded-for": "203.0.113.9" }))).toBe(
      "203.0.113.9",
    );
  });

  it("tolerates padding and empty entries", () => {
    const req = requestWith({ "x-forwarded-for": "1.2.3.4,  , 203.0.113.9 ," });
    expect(getClientIp(req)).toBe("203.0.113.9");
  });

  it("falls back to x-real-ip, then to a stable marker", () => {
    expect(getClientIp(requestWith({ "x-real-ip": "203.0.113.5" }))).toBe(
      "203.0.113.5",
    );
    // A shared bucket is the right failure mode here: coarse limiting beats
    // none, and it cannot be widened by omitting headers.
    expect(getClientIp(requestWith({}))).toBe("ip:unknown");
  });

  it("does not fall through to x-real-ip when a forwarded hop exists", () => {
    const req = requestWith({
      "x-forwarded-for": "1.2.3.4, 203.0.113.9",
      "x-real-ip": "1.2.3.4",
    });
    expect(getClientIp(req)).toBe("203.0.113.9");
  });
});
