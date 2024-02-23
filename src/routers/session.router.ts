import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { ensure } from "../middlewares/ensure.middleware";
import { sessionCreateSchema } from "../schemas/session.schema";
import { auth } from "../middlewares";

export const sessionRouter = Router();

const controller = new SessionController()

sessionRouter.post(
    "/login", 
    ensure.validBody(sessionCreateSchema), 
    controller.login
);

sessionRouter.get(
    "/profile", auth.isAuthenticated,
    controller.autoLogin
);