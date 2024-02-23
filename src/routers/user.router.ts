import { Router } from "express";
import { ensure } from "../middlewares";
import { UserController } from "../controllers/UserController";
import { userCreateSchema } from "../schemas";

export const userRouter = Router();

const controller = new UserController();

userRouter.post("", ensure.validBody(userCreateSchema), ensure.emailExists, controller.create);