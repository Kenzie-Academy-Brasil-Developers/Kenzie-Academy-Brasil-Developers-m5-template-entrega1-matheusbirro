import { Request, Response } from "express";
import { TasksService } from "../services/TasksService";

export class TaskController {
    private taskService: TasksService = new TasksService();

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newTask = await this.taskService.create(req.body)
        return res.status(201).json(newTask);
    }

    public read = async (_: Request, res: Response): Promise<Response> => {
        const allTasks = await this.taskService.read()
        return res.status(200).json(allTasks);
    }

    public retrieve = async (req: Request, res: Response): Promise<Response> => {
        const task = await this.taskService.retrieve(req.params.taskId)
        return res.status(200).json(task);
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.taskService.delete(req.params.taskId)
        return res.status(204).json();
    }
}