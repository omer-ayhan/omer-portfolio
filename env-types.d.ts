declare module "dotenv/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      DB_NAME: string;
      SKILLS: string;
      PROJECTS: string;
      PROJECT_TAGS: string;
      ABLY_API_KEY: string;
      ABLY_CLIENT_ID: string;
    }
  }
}
export {};
