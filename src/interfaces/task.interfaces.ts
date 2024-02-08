import { z } from "zod";
import { taskCreateSchema, taskReturnSchema, taskSchema, taskUpdateSchema } from "../schemas";

type Task = z.infer<typeof taskSchema>;
type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskReturn = z.infer<typeof taskReturnSchema>;
type TaskUpdate = z.infer<typeof taskUpdateSchema>;

export { Task, TaskCreate, TaskUpdate, TaskReturn };