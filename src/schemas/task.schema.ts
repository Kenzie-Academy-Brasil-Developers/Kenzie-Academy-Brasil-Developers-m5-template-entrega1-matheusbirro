import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categoryReturnSchema, categorySchema } from "./category.schema";

const taskSchema = baseSchema.extend({
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),
    category: categorySchema.nullish(),
    userId: z.number().positive()
});

const taskReturnGetSchema = baseSchema.extend({
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),
    category: categoryReturnSchema.nullish()
});

const taskReturnSchema = taskSchema.omit({category: true}).extend({ categoryId: z.number().positive().nullish()});

const taskCreateSchema = taskReturnSchema.omit({id: true, finished: true, userId: true});

const taskUpdateSchema = taskCreateSchema.partial();


export { taskSchema, taskCreateSchema, taskReturnSchema , taskUpdateSchema, taskReturnGetSchema };