import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "You are unauthorized",
        });
      }

      // Extract bearer token

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      // Verify JWT

      const decodedToken = jwt.verify(
        token as string,
        config.jwt_secret as string
      ) as JwtPayload;

      console.log("Decoded Token: ", decodedToken);

      req.user = decodedToken;
      const user = req.user;

      // role checking
      if (roles.length && !roles.includes(user.role as string)) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized! This role is not allowed for this data ",
        });
      }

      next();
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: err.message,
      });
    }
  };
};

export default auth;
