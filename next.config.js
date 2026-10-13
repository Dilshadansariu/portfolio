/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hides the floating "N" Next.js dev-tools badge shown only while running
  // `npm run dev` (it never appears in a production build). Real compile/runtime
  // errors still show in the terminal and as the normal error overlay.
  devIndicators: false,
  // Security headers that genuinely apply to this project: a static,
  // no-backend portfolio with no custom API routes, no auth, and no
  // database. A strict Content-Security-Policy is deliberately NOT included
  // here — getting one right (allowing Next.js's own inline hydration
  // scripts + the JSON-LD tag + the Formspree fetch) needs nonce-based
  // testing against the real deployed origin, which isn't safe to guess at
  // blindly. Recommended as a follow-up once there's a live deployment to
  // test against, rather than shipping an unverified CSP that could silently
  // break the site.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
