/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL?: string;
  readonly VITE_ADMIN_PASSWORD?: string;
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
