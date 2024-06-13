declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;

      JWT_SECRET: string;

      CLIENT_ORIGIN: string;

      SES_ACCESS_KEY: string;
      SES_SECRET_KEY: string;

      S3_ACCESS_KEY: string;
      S3_SECRET_KEY: string;
    }
  }
}
