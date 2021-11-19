/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  // env: {
  //   MONGODB_URI: process.env.MONGODB_URI,
  //   DB_NAME: process.env.DB_NAME,
  //   SKILLS: process.env.SKILLS,
  //   PROJECTS: process.env.PROJECTS,
  //   PROJECT_TAGS: process.env.PROJECT_TAGS,
  //   ABLY_PUBLISH: process.env.ABLY_PUBLISH,
  //   ABLY_USER: process.env.ABLY_USER,
  //   ABLY_CLIENT_ID: process.env.ABLY_CLIENT_ID,
  //   SENDGRID_API: process.env.SENDGRID_API,
  //   PUBLIC_RECAPTCHA_SITE_KEY: process.env.PUBLIC_RECAPTCHA_SITE_KEY,
  //   RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
  // },
});
