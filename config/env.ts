// Exportar las variables de entorno con valores por defecto
export const env = {
  // URL base del API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",

  // Información de la aplicación
  appName: import.meta.env.VITE_APP_NAME || "E-SEUS",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",

  // Autenticación validar esto
  authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || "eseus_auth_token",

  // Timeouts
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000", 10),

  // Paginación tambien se debe valdiar esto como se usa en python con el Framework
  defaultPageSize: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE || "10", 10),
  maxPageSize: parseInt(import.meta.env.VITE_MAX_PAGE_SIZE || "100", 10),
} as const;

export type Env = typeof env;
