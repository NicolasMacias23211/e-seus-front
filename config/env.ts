// Exportar las variables de entorno con valores por defecto
export const env = {
  // Ambiente de ejecución
  isDevelopment: import.meta.env.DEV || false,
  
  // URL base del API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  eldapApiUrl: import.meta.env.ELDAP_API_URL || "https://ldapnet.emtelco.co/Emtelco/ldapnet/login/",
  EldapAuthToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFwbGljYWNpb25lc2dyYWxAaG90bWFpbC5jb20iLCJqdGkiOiI1NDJkNDYyZi04OTMyLTQxNDEtYTUwMi1jMGU5ZTMzMzA2MTIiLCJleHAiOjE4ODcwMjMyNzcsImlzcyI6InlvdXJkb21haW4uY29tIiwiYXVkIjoieW91cmRvbWFpbi5jb20ifQ.7pB8dcmkgmBOkemWDmO32GdweZ2ElRwi0Hx71QD5qos",
  
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
