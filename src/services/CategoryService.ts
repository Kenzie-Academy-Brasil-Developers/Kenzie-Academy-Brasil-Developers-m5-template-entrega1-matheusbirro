import { Response } from "express";
import { prisma } from "../database/prisma";
import { category, categoryCreate, categoryReturn } from "../interfaces/category.interfaces";
import { categoryReturnSchema, categorySchema } from "../schemas";

export class CategoryService {
    public create = async (payload: categoryCreate, res:Response):Promise<categoryReturn> => {
        
        const userId = res.locals.decoded.sub;
        
        const newCategory: category = await prisma.category.create({ data: {...payload , userId: Number(userId)}});
        
        return categoryReturnSchema.parse(newCategory);
    };

    public read = async (res:Response):Promise<categoryReturn[]> => {   
        const userId = Number(res.locals.decoded.sub);
        
        const allCategories = await prisma.category.findMany(
            {where:
                {userId: userId}
            }
        );
            
        return categoryReturnSchema.array().parse(allCategories) 
    };

    public retrieve = async (categoryId:string):Promise<categoryReturn> => {
        const category = await prisma.category.findUnique(
            { where: 
                { id: Number(categoryId)},
            });
        return categoryReturnSchema.parse(category); 
    };

    public delete = async (categoryId: string):Promise<void> => {
        await prisma.category.delete({ where: { id: Number(categoryId) } }); 
    }; 
}