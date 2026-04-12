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

  // Community → Inner Circle redirects. The community section was merged
  // into the Inner Circle in April 2026. Old links and bookmarks should
  // land in the right place.
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/community")) {
    const newPath = pathname
      .replace(/^\/community\/forum/, "/inner-circle/forum")
      .replace(/^\/community\/chat/, "/inner-circle/chat")
      .replace(/^\/community$/, "/inner-circle/feed");
    const base = `https://${host}`;
    return NextResponse.redirect(`${base}${newPath}${request.nextUrl.search}`, 301);
  }

  const response = NextResponse.next();

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
