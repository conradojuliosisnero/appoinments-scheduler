export const env = {
  quotes: process.env.GET_QUOTES || "",
  quote: process.env.GET_QUOTES_BY_ID || "",
  secret: process.env.AUTH_SECRET_TOKEN || "",
  users: process.env.GET_USERS || "",
};