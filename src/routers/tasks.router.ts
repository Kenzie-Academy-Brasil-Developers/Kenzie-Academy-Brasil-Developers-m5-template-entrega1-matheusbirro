import { Router } from "express";
import { ensure } from "../middlewares";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";
import { TaskController } from "../controllers/TaskController";

export const tasksRouter = Router();

const controller = new TaskController()

tasksRouter.post(
    "", 
    ensure.validBody(taskCreateSchema), 
    ensure.bodyCategoryIdExists, 
    controller.create
);
tasksRouter.get("",controller.read);

tasksRouter.use("/:taskId", ensure.paramsTaskIdExists);

tasksRouter.get("/:taskId", controller.retrieve);
tasksRouter.patch("/:taskId", ensure.validBody(taskUpdateSchema), controller.update);
tasksRouter.delete("/:taskId", controller.delete);