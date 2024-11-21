interface ImportMetaEnv {
  readonly VITE_UPSTREAM_GQL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly WEB_PORT: string;
  }
}
