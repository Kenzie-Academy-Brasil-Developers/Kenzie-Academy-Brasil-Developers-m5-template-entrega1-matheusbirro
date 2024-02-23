import { Request, Response } from "express";
import { TasksService } from "../services/TasksService";

export class TaskController {
    private taskService: TasksService = new TasksService();

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newTask = await this.taskService.create(req.body, res)
        return res.status(201).json(newTask);
    }

    public read = async (req: Request, res: Response): Promise<Response> => {
        const allTasks = await this.taskService.read( res, req.query.category as string,);
        
        return res.status(200).json(allTasks);
    }

    public retrieve = async (req: Request, res: Response): Promise<Response> => {
        const task = await this.taskService.retrieve(req.params.id)
        return res.status(200).json(task);
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        const task = await this.taskService.update(req.params.id, req.body)
        return res.status(200).json(task);
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.taskService.delete(req.params.id)
        return res.status(204).json();
    }
}