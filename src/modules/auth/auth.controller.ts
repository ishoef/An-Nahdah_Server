import { Request, Response } from "express";
import { authService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  console.log("registerUser: ", req.body);

  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User Registerd Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `User Registerd Failed "${error.message}"`,
    });
  }
};

export const authController = {
  registerUser,
};
