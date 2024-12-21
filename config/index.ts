export const ConfigValue = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
    AUTH_TOKEN_KEY: process.env.COOKIE_KEY ?? "cookie_key",
};