import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { getToken } from "./controllers/getToken.controller";

export const videoRouter = Router();

videoRouter.post("/token/:token", requireAuth, getToken);
videoRouter.post("/token", requireAuth, getToken);
