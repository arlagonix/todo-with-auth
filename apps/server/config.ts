import dotenv from "dotenv";
dotenv.config();
const config = {
  port: process.env.PORT ?? 3000,
  databaseURL: process.env.DATABASE_URL,
  serviceAccountKeyFirebase: JSON.parse(process.env.SERVICE_ACCOUNT_KEY_FIREBASE),
};

export default config;
