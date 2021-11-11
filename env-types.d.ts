declare module "dotenv/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      DB_NAME: string;
      SKILLS: string;
      PROJECTS: string;
      PROJECT_TAGS: string;
      ABLY_PUBLISH: process.env.ABLY_PUBLISH;
      ABLY_USER: process.env.ABLY_USER;
      ABLY_CLIENT_ID: string;
    }
  }
}
export {};
