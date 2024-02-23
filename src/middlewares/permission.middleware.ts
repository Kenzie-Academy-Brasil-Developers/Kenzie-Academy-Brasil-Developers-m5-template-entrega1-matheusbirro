import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors";

class PermissionMiddleware{
    public isOwnerTaskId = async(req: Request ,res:Response, next: NextFunction): Promise<void> => {
        const userTokenId = Number(res.locals.decoded.sub);
        const taskId = Number(req.params.id);

        const task = await prisma.task.findFirst({where: {id: taskId}})

        if (task?.userId === userTokenId) {
            return next();
        }
        throw new AppError("This user is not the task owner", 403);
    } 

    public isOwnerCategoryId = async(req: Request ,res:Response, next: NextFunction): Promise<void> => {
        const userTokenId = Number(res.locals.decoded.sub);
        const categoryId = Number(req.params.categoryId);

        const category = await prisma.category.findFirst({where: {id: categoryId}})

        if (category?.userId === userTokenId) {
            return next();
        }
        throw new AppError("This user is not the category owner", 403);
    } 
}

export const permission = new PermissionMiddleware();