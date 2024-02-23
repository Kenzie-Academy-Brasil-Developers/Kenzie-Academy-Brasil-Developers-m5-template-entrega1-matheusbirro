import { Response } from "express";
import { prisma } from "../database/prisma";
import { Task, TaskCreate, TaskReturn } from "../interfaces/task.interfaces";
import { taskReturnSchema, taskSchema } from "../schemas";

export class TasksService { 
    public create = async ({categoryId, ...payload}: TaskCreate, res:Response):Promise<TaskReturn> => {
        const userId= Number(res.locals.decoded.sub);
        
        if (categoryId) {
            const newTask: TaskReturn = await prisma.task.create({ data: {finished: true, ...payload, categoryId, userId: userId} });
            
            return taskReturnSchema.parse(newTask);
        }
        const newTask: TaskReturn = await prisma.task.create({ data: {...payload, userId: userId}});
        return taskReturnSchema.parse(newTask);
    };

    public read = async (res: Response, categoryName?: string):Promise<Task[]> => {   
        const userId = Number(res.locals.decoded.sub);
        
        if (categoryName) {
            const allTasks = await prisma.task.findMany(
                {where: 
                    {category: {name: categoryName}},
                    include: {category: true}
                }
            );   
            
            return taskSchema.array().parse(allTasks)  
        }
        
        const allTasks = await prisma.task.findMany(
            {where: 
                {userId: userId},
                include: {category: true}
            }
        );
            
        return taskSchema.array().parse(allTasks) 
    }; 

    // public readTasksByCategory = async (categoryName: string): Promise<Task[]> => {
    //     const allTasks = await prisma.task.findMany(
    //         {where: 
    //             {category: {name: categoryName}},
    //             include: {category: true}
    //         });
            
            
    //     return taskSchema.array().parse(allTasks) 
    // }

    public retrieve = async (taskId:string):Promise<Task | null> => {
        const task = await prisma.task.findUnique(
            { where: 
                { id: Number(taskId)},
                include:{ category: true}  
            });
        return taskSchema.parse(task); 
    };

    public update = async (taskId:string, payload: Partial<TaskCreate>): Promise<TaskReturn> =>{
        if(payload.categoryId) {
            const task = await prisma.task.update({ data: {finished: true, ...payload},  where: { id: Number(taskId) } });
        
            return taskReturnSchema.parse(task);
        }

        const task = await prisma.task.update({ data: payload,  where: { id: Number(taskId) } });
        
        return taskReturnSchema.parse(task);
    }
    
    public delete = async (taskId: string):Promise<void> => {
        await prisma.task.delete({ where: { id: Number(taskId) } }); 
    }; 
}