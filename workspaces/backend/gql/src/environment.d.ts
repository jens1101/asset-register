declare global {
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

// Ensure that this file is considered a module by adding an empty export
// statement.
export {};
