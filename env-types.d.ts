declare module "dotenv/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ABLY_USER: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
      SENDGRID_API: string;
    }
  }
}
export {};
