declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      GQL_SERVER_PORT: string;
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_NAME: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      ENABLE_DB_LOGGING?: "true" | "false";
    }
  }
}

export type Maybe<T> = T | null | undefined;
