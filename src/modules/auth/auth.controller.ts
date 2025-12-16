import { Request, Response } from "express";
import { authService } from "./auth.service";

// Register User
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

// login User
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: `login failed: ${error.message}`,
    });
  }
};

export const authController = {
  registerUser,
  loginUser,
};
