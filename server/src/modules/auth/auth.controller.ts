import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/index";
import { commonResponse } from "../../utils/commonResponse";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json(commonResponse(null, "Missing required fields", 400));
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res
      .status(400)
      .json(commonResponse(null, "User already exists", 400));
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(201).json(
    commonResponse(
      {
        token,
        user: { id: user.id, email: user.email, name: user.name },
      },
      "User registered successfully",
      201,
    ),
  );
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(401)
      .json(commonResponse(null, "Invalid credentials", 401));
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res
      .status(401)
      .json(commonResponse(null, "Invalid credentials", 401));
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.json(
    commonResponse(
      {
        token,
        user: { id: user.id, email: user.email, name: user.name },
      },
      "Login successful",
      200,
    ),
  );
};
