import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import * as videoController from "./video.controller";

export const videoRouter = Router();

videoRouter.post("/token", requireAuth, videoController.getToken);
