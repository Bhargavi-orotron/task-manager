import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import dbConfig from "../config/dbConfig";
import * as UserSchema from '../connection/schema/users';
import fs from "fs";


const { Pool } = pg;

const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port, // Ensure it's 21243
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
});

export const db = drizzle(pool);
