import { Request, Response } from "express";
import { usersService } from "./users.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users get successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `No users found: ${error.message}`,
    });
  }
};

export const usersController = {
  getUsers,
};
