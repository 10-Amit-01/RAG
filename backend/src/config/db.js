import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max:10
});

pool.on("error", (err) => {
  console.log("unexpected idle client error", err);
});