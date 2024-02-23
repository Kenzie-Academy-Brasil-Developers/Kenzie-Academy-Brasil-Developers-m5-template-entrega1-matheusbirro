import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../errors";

class EnsureMiddleware{
    public validBody = (schema: AnyZodObject) => 
        (req: Request, _:Response, next: NextFunction): void => {
            
            req.body = schema.parse(req.body);
            return next();
    }

    public bodyCategoryIdExists = async ({ body: { categoryId } }: Request, _: Response, next: NextFunction): Promise<void> => {
        if (!categoryId) {
         return next();
        }
        const foundCategory = await prisma.category.findFirst({
          where: { id: Number(categoryId) },
        });
    
        if (!foundCategory) {
          throw new AppError("Category not found", 404);
        }
    
        return next();
    };

    public paramsTaskIdExists = async (
        req: Request,
        _: Response,
        next: NextFunction
      ): Promise<void> => {
        const { id } = req.params;
    
        const foundTask = await prisma.task.findFirst({
          where: { id: Number(id) }
        });
    
        if (!foundTask) {
          throw new AppError("Task not found!", 404);
        }
    
        return next();
      };
    
    public categoryIdExists = async (
        req: Request,
        _: Response,
        next: NextFunction
    ): Promise<void> => {
    const { categoryId } = req.params;

    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(categoryId) }
    });

    if (!foundCategory) {
      throw new AppError("Category not found!", 404);
    }

    return next();
    };

    public emailExists = async ({ body: { email } }, _:Response, next:NextFunction): Promise<void> => {
      const foundUser = await prisma.user.findFirst({where: {email: email}});
      
      if (!foundUser) {
        return next();
      }

      throw new AppError("This email is already registered", 409);
    }
}

export const ensure = new EnsureMiddleware();