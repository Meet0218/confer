import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "express-async-errors";

import { authRouter } from "./modules/auth/auth.route";
import { videoRouter } from "./modules/video/video.route";
import { paymentsRouter } from "./modules/payments/payments.route";
import { callsRouter } from "./modules/calls/calls.route";
import { errorHandler } from "./middleware/errorHandler";
import { commonResponse } from "./utils/commonResponse";

export const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

// Webhook needs raw body, so we conditionally apply JSON parser
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/payments/webhook")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json(commonResponse({ ok: true }, "Server health check successful", 200));
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/video", videoRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/calls", callsRouter);

// Global Error Handler
app.use(errorHandler);
