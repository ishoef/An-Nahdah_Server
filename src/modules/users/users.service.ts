import { pool } from "../../config/db/pool";

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

export const usersService = {
  getUsers,
};
