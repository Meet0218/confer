import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { commonResponse } from "../utils/commonResponse";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; name?: string };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const token = (req as Request & { cookies?: Record<string, string> })?.cookies
    ?.token;

  if (!token) {
    return res.status(401).json(commonResponse(null, "Unauthorized", 401));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name?: string;
    };
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json(commonResponse(null, "Invalid token", 401));
  }
}
