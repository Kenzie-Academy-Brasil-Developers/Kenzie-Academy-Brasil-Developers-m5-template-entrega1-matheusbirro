import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
    private categoryService: CategoryService = new CategoryService();

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoryService.create(req.body, res)
        return res.status(201).json(newCategory);
    }

    public read = async (req: Request, res: Response): Promise<Response> => {
        const allCategories = await this.categoryService.read(res)
        return res.status(200).json(allCategories);
    }

    public retrieve = async (req: Request, res: Response): Promise<Response> => {
        const category = await this.categoryService.retrieve(req.params.categoryId)
        return res.status(200).json(category);
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryService.delete(req.params.categoryId)
        return res.status(204).json();
    }
}