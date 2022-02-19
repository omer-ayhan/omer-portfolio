/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

const nextTranslate = require("next-translate");

const security_headers = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/(.*)", // applies headers to all pages
        headers: security_headers, // headers to apply
      },
    ];
  },
  i18n: {
    locales: ["en", "tr"],
    defaultLocale: "en",
    localeDetection: true,
  },
};

module.exports = nextTranslate();
