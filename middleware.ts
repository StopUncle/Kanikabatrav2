import { NextRequest, NextResponse } from "next/server";

/**
 * Global middleware. Currently does one thing: sets a Content-Security-
 * Policy-Report-Only header on every response.
 *
 * Why report-only first? A CSP that blocks anything the site legitimately
 * loads will 500 pages. Report-only lets us observe which sources are used
 * without affecting users, then tighten to an enforcing policy later.
 *
 * Sources allowed (keep this list in sync with what the app actually loads):
 *   - self                  → everything from kanikarose.com
 *   - googletagmanager      → Google Analytics gtag script loader
 *   - google-analytics      → GA beacon endpoint
 *   - js.stripe.com         → Stripe.js SDK
 *   - api.stripe.com        → Stripe API (connect from payment flows)
 *   - *.pusher.com          → Pusher real-time chat
 *   - *.r2.dev              → Cloudflare R2 public voice notes + avatars
 *   - *.r2.cloudflarestorage.com → R2 backend
 *   - youtube.com           → embedded YouTube players (book trailer etc.)
 *   - youtube-nocookie.com  → YouTube privacy mode
 *   - i.ytimg.com           → YouTube thumbnails
 *   - fonts.googleapis.com  → Google Fonts CSS
 *   - fonts.gstatic.com     → Google Fonts WOFF
 *   - data: / blob:         → inline images + audio blob URLs
 *
 * 'unsafe-inline' is required on script-src and style-src because Next.js
 * inlines both. A nonce-based approach would be stricter but requires
 * rewriting _document / app/layout to emit nonces on every <Script> and
 * <style> — real but out of scope for this commit.
 */

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com https://*.pusher.com https://*.pusherapp.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https: https://*.r2.dev https://*.r2.cloudflarestorage.com https://i.ytimg.com https://img.youtube.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "media-src 'self' blob: https://*.r2.dev https://*.r2.cloudflarestorage.com",
  "connect-src 'self' https://www.google-analytics.com https://api.stripe.com https://*.pusher.com wss://*.pusher.com https://*.pusherapp.com wss://*.pusherapp.com https://*.r2.dev https://*.r2.cloudflarestorage.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export function middleware(request: NextRequest) {
  // Canonical URL: redirect www → non-www. Without this, www.kanikarose.com
  // serves the same content but client-side origin checks (Pusher, CORS)
  // fail because the app is configured for kanikarose.com only.
  const host = request.headers.get("host") || "";
  if (host.startsWith("www.")) {
    // Build the redirect URL from scratch instead of cloning nextUrl.
    // Behind Railway's reverse proxy, nextUrl.clone() can leak the
    // internal container port (8080) into the redirect, sending users
    // to kanikarose.com:8080 which doesn't resolve.
    const nonWwwHost = host.replace(/^www\./, "");
    const redirectUrl = `https://${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Legacy URL redirects. Old paths keep working forever so email CTAs,
  // bookmarks, and links posted on social all land in the right place.
  //
  //   /community/*    -> /consilium/*   (community was merged in Apr 2026)
  //   /inner-circle/* -> /consilium/*   (rebrand in Apr 2026)
  const { pathname } = request.nextUrl;
  if (pathname === "/community" || pathname.startsWith("/community/")) {
    // Everything under the old prefix lands on the feed. Forum and chat are
    // retired (their /consilium pages 302 to the feed anyway), and mapping
    // only known paths left the rest 301-ing to themselves — an infinite
    // redirect loop that browsers cache.
    const base = `https://${host}`;
    return NextResponse.redirect(`${base}/consilium/feed`, 301);
  }
  if (pathname.startsWith("/inner-circle")) {
    const newPath = pathname.replace(/^\/inner-circle/, "/consilium");
    const base = `https://${host}`;
    return NextResponse.redirect(`${base}${newPath}${request.nextUrl.search}`, 301);
  }

  // App entry fast path. A request for the app with no session cookie at
  // all can only ever end in a bounce to /login, but that bounce used to
  // be paid AFTER the page shell started streaming: the splash painted,
  // then the client hopped. Deciding here makes it one instant redirect
  // with nothing drawn in between. Cookie PRESENCE is not authentication,
  // the server components still verify; a stale cookie just falls through
  // to the old path.
  if (
    pathname === "/start" ||
    pathname === "/app" ||
    pathname.startsWith("/app/")
  ) {
    const hasSession =
      request.cookies.has("accessToken") ||
      request.cookies.has("refreshToken") ||
      request.cookies.has("admin_session");
    if (!hasSession) {
      // Same host-string construction as the www redirect above: behind
      // Railway's proxy, nextUrl.clone() can leak the internal port.
      const proto = host.startsWith("localhost") || host.startsWith("127.")
        ? "http"
        : "https";
      const target = encodeURIComponent(pathname + request.nextUrl.search);
      // /start is the PWA front door (manifest start_url, QR scans, install
      // links), so a cold visitor there has probably never had an account.
      // Registration is the right first screen; a deep link into /app/* is
      // far more likely an existing member with an expired jar, so login.
      const entry = pathname === "/start" ? "register" : "login";
      const param = entry === "register" ? "returnTo" : "redirect";
      return NextResponse.redirect(
        `${proto}://${host}/${entry}?${param}=${target}`,
        307,
      );
    }
  }

  // Forward the public pathname to server components. Layouts cannot see
  // the URL they are rendering for, so requireServerAuth used to hardcode
  // "/app" as its post-login destination and a stale-cookie visitor lost
  // their deep link. The rewrite (/app/* -> /hub/*) happens after
  // middleware, so this is the URL the visitor actually typed.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname + request.nextUrl.search);
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Report-only mode — violations will log to the browser console and to
  // any report-uri we configure later. Does NOT block anything.
  //
  // Flip to "Content-Security-Policy" (without -Report-Only) once we've
  // observed no legitimate violations for a while.
  response.headers.set("Content-Security-Policy-Report-Only", CSP_DIRECTIVES);

  return response;
}

/**
 * Skip middleware on static assets, API routes, and Next internals.
 * API routes have their own response shape; static files don't benefit
 * from a CSP header.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
