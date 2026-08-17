import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { createCall } from "./controllers/createCall.controller";
import { getCallSummary } from "./controllers/callSummary.controller";
import { getUsers } from "./controllers/getUsers.controller";

export const callsRouter = Router();

callsRouter.post("/", requireAuth, createCall);
callsRouter.get("/:id/summary", requireAuth, getCallSummary);

callsRouter.get("/get-users", requireAuth, getUsers);
