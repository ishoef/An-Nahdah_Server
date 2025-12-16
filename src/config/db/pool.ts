import { Pool } from "pg";
import config from "..";

export const pool = new Pool({
  connectionString: config.connection_str,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});
