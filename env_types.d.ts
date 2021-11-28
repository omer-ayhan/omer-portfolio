declare module "dotenv/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ABLY_USER: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
      NEXT_PUBLIC_SKILLS_CHANNEL: string;
      NEXT_PUBLIC_PROJECTS_CHANNEL: string;
      SENDGRID_API: string;
    }
  }
}
export {};
