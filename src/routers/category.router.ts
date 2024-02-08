import { Router } from "express";
import { ensure } from "../middlewares";
import { categoryCreateSchema } from "../schemas";
import { CategoryController } from "../controllers/CategoryController";

export const categoryRouter = Router();

const controller = new CategoryController()

categoryRouter.post("", ensure.validBody(categoryCreateSchema), controller.create);

categoryRouter.use("/:categoryId", ensure.categoryIdExists);

categoryRouter.delete("/:categoryId", controller.delete);