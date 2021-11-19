declare module "dotenv/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      DB_NAME: string;
      SKILLS: string;
      PROJECTS: string;
      PROJECT_TAGS: string;
      ABLY_PUBLISH: string;
      ABLY_USER: string;
      ABLY_CLIENT_ID: string;
      SENDGRID_API: string;
      PUBLIC_RECAPTCHA_SITE_KEY: string;
      RECAPTCHA_SECRET: string;
    }
  }
}
export {};
