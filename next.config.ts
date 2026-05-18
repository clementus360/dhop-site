import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP applied to every response. We do not use nonces (the site is fully
// static), so script-src/style-src allow inline content. The Google Maps
// embed in the Location section requires https://www.google.com in
// frame-src; everything else stays same-origin.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // upgrade-insecure-requests is production-only — in dev it tries to
  // upgrade http://localhost to https and the browser hits a TLS error.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    // Dev hits localhost over plain HTTP; CSP + CORP confuse the browser
    // (sticky upgrade-insecure-requests, blocked HMR scripts) and serve
    // no real security benefit on a local box. Production only.
    if (isDev) return [];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
