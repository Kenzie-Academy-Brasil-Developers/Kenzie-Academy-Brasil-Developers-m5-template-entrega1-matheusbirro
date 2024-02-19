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

tasksRouter.use("/:id", ensure.paramsTaskIdExists);

tasksRouter.get("/:id", controller.retrieve);
tasksRouter.patch("/:id", ensure.validBody(taskUpdateSchema), controller.update);
tasksRouter.delete("/:id", controller.delete);