import { Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/signup", authController.registerUser);
router.post("/signin", auth(), authController.loginUser);

export const authRoutes = router;
