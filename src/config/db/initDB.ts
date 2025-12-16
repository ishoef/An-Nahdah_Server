import { pool } from "./pool";
import { tables } from "./tables";

const initDB = async () => {
  try {
    for (const table of tables) {
      await pool.query(table);
    }
    console.log("✅ All tables initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
};

export default initDB;
