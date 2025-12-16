import bcrypt from "bcryptjs";
import { pool } from "../../config/db/pool";

// Register User
const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  if (!password) {
    throw new Error("Password is missing");
  }

  const hashPass = await bcrypt.hash(password as string, 10);

  // Insert user to db
  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashPass, phone, role]
  );

  return result;
};

export const authService = {
  registerUser,
};
