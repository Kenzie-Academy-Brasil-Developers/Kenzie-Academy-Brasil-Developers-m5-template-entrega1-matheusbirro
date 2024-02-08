import { prisma } from "../database/prisma";
import { Task, TaskCreate, TaskReturn } from "../interfaces/task.interfaces";
import { taskReturnSchema, taskSchema } from "../schemas";

export class TasksService { 
    public create = async (payload: TaskCreate):Promise<TaskReturn> => {
        const newTask: TaskReturn = await prisma.task.create({ data: payload });
        return taskReturnSchema.parse(newTask) 
    };

    public read = async ():Promise<Array<Task>> => {
        const allTasks = await prisma.task.findMany({ include: {category: true} });
        return taskSchema.array().parse(allTasks) 
    }; 

    public retrieve = async (taskId:string):Promise<Task> => {
        const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });
        return taskSchema.parse(task); 
    };

    public update = async (taskId:string, payload: Partial<TaskCreate>): Promise<TaskReturn> =>{
        const task = await prisma.task.update({ data: payload,  where: { id: Number(taskId) } });
        return taskReturnSchema.parse(task);
    }
    
    public delete = async (taskId: string):Promise<void> => {
        await prisma.task.delete({ where: { id: Number(taskId) } }); 
    }; 
}