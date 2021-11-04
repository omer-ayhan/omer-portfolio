/** @type {import('next').NextConfig} */
require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    SKILLS: process.env.SKILLS,
    PROJECTS: process.env.PROJECTS,
    PROJECT_TAGS: process.env.PROJECT_TAGS,
  },
};
