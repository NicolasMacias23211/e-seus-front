// Exportar las variables de entorno con valores por defecto
export const env = {
  // Ambiente de ejecución
  isDevelopment: import.meta.env.DEV || true,
  
  // URL base del API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  eldapApiUrl: import.meta.env.ELDAP_API_URL || "https://ldapnet.emtelco.co/Emtelco/ldapnet/login/",

  EldapAuthToken : "",
  
  // Variable de Desarrollo. Eliminar en producción
  EldapUser: {
    user: "sjimeher",
    full_name: "SEBASTIAN CAMILO JIMENEZ HERNANDEZ",
    position: "ARQUITECTO DE AVA",
    mail: "sjimeher@emtelco.com.co",
    document: "1017263043"
  },
  
  appName: import.meta.env.VITE_APP_NAME || "E-SEUS",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",

  authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || "eseus_auth_token",

  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000", 10),

  defaultPageSize: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE || "10", 10),
  maxPageSize: parseInt(import.meta.env.VITE_MAX_PAGE_SIZE || "100", 10),
} as const;

export type Env = typeof env;
