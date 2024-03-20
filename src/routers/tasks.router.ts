import { Router } from "express";
import { auth, ensure } from "../middlewares";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";
import { TaskController } from "../controllers/TaskController";
import { permission } from "../middlewares/permission.middleware";

export const tasksRouter = Router();

const controller = new TaskController()

tasksRouter.post(
    "", 
    auth.isAuthenticated, 
    ensure.validBody(taskCreateSchema), 
    ensure.bodyCategoryIdExists, 
    controller.create
);

tasksRouter.get(
    "",
    auth.isAuthenticated, 
    ensure.categoryNameExists,
    controller.read
);

tasksRouter.use("/:id", auth.isAuthenticated, ensure.paramsTaskIdExists);

tasksRouter.get("/:id", auth.isAuthenticated,permission.isOwnerTaskId, controller.retrieve);
tasksRouter.patch("/:id", ensure.validBody(taskUpdateSchema), permission.isOwnerTaskId, ensure.bodyCategoryIdExists, controller.update);
tasksRouter.delete("/:id", permission.isOwnerTaskId, controller.delete);