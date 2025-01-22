import { defineConfig } from "drizzle-kit";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/connection/schema/*",
  out: "./migrations",
  dbCredentials: {
    host: process.env.HOST!,
    port: Number(process.env.PORT), 
    user: process.env.USER!,
    password: process.env.PASSWORD!,
    database: process.env.DATABASE_NAME!,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync("./ca.pem").toString(), 
    },
  },
});
