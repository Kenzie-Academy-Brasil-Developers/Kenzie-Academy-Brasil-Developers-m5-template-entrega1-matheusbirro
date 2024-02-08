import { prisma } from "../database/prisma";
import { category, categoryCreate } from "../interfaces/category.interfaces";
import { categorySchema } from "../schemas";

export class CategoryService {
    public create = async (payload: categoryCreate):Promise<category> => {
        const newCategory: category = await prisma.category.create({ data: payload });
        return categorySchema.parse(newCategory);
    };

    public delete = async (categoryId: string):Promise<void> => {
        await prisma.category.delete({ where: { id: Number(categoryId) } }); 
    }; 
}