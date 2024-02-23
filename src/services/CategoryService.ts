import { Response } from "express";
import { prisma } from "../database/prisma";
import { category, categoryCreate } from "../interfaces/category.interfaces";
import { categorySchema } from "../schemas";

export class CategoryService {
    public create = async (payload: categoryCreate, res:Response):Promise<category> => {
        
        const userId = res.locals.decoded.sub;
        
        const newCategory: category = await prisma.category.create({ data: {...payload , userId: Number(userId)}});
        
        return categorySchema.parse(newCategory);
    };

    public delete = async (categoryId: string):Promise<void> => {
        await prisma.category.delete({ where: { id: Number(categoryId) } }); 
    }; 
}