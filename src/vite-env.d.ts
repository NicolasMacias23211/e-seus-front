/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_AUTH_TOKEN_KEY: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_DEFAULT_PAGE_SIZE: string;
  readonly VITE_MAX_PAGE_SIZE: string;
  readonly ELDAP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
