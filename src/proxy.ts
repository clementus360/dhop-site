import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request Content-Security-Policy with a fresh nonce.
 *
 * Observatory's "implemented unsafely" finding triggers when script-src
 * contains 'unsafe-inline' without a nonce or 'strict-dynamic' to
 * neutralise it. We generate a nonce here, splice it into the policy,
 * and Next.js auto-attaches it to its own inline framework scripts.
 *
 * Trade-off: pages that read the nonce (via the CSP header at render
 * time) become dynamically rendered. That's why /app/page.tsx and
 * /app/menu/page.tsx call `await connection()`.
 */
export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' tells modern browsers to trust scripts loaded by
    // nonce'd scripts and ignore 'unsafe-inline' / host allowlists.
    // 'unsafe-inline' is kept as a fallback for older browsers that
    // don't understand 'strict-dynamic'.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline'${
      isDev ? " 'unsafe-eval'" : ""
    }`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|img/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
