import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import * as callsController from "./calls.controller";

export const callsRouter = Router();

callsRouter.post("/", requireAuth, callsController.createCall);
callsRouter.get("/:id/summary", requireAuth, callsController.getCallSummary);
