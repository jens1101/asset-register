interface ImportMetaEnv {
  readonly VITE_GQL_SERVER_PORT: string;
  readonly VITE_GQL_SERVER_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly WEB_PORT: string;
  }
}
