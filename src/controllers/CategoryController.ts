import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
    private categoryService: CategoryService = new CategoryService();

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoryService.create(req.body, res)
        return res.status(201).json(newCategory);
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryService.delete(req.params.categoryId)
        return res.status(204).json();
    }
}