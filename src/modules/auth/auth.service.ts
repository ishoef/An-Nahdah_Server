import bcrypt from "bcryptjs";
import { pool } from "../../config/db/pool";
import config from "../../config";
import jwt from "jsonwebtoken";

// Register User
interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  age: number;
  gender: "male" | "female" | "other";
}

const registerUser = async (payload: RegisterUserPayload) => {
  const { name, email, password, phone = null, age, gender } = payload;

  // Basic validation
  if (!name || !email || !password || !age || !gender) {
    throw new Error("Missing required fields");
  }

  // Hash password
  const hashPass = await bcrypt.hash(password, 10);

  // Insert user (role omitted → default applied)
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, age, gender)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, email, phone, role, age, gender, created_at
    `,
    [name, email, hashPass, phone, age, gender]
  );

  return result.rows[0];
};


// Login User
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return `User not found by this email ${email}`;
  }

  // user
  const user = result.rows[0];
  console.log(user);

  // Password Checking
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    return "Wrong Credentials";
  }

  // Creating jwt
  const secret = config.jwt_secret as string;
  const token = jwt.sign(
    {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "7d" }
  );

  console.log("token: ", { token });
  return { token: `Bearer ${token}`, user };
};

export const authService = {
  registerUser,
  loginUser,
};
