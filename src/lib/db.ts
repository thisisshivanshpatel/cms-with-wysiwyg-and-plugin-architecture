import { Pool } from "pg";

export const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // password: process.env.DB_PASSWORD,
  // port: Number(process.env.DB_PORT),
  // database: process.env.DB_NAME,
  connectionString: process.env.DATABASE_URL,
});
