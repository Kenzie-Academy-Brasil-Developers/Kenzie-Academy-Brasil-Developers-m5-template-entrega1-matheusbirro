import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";

const taskSchema = baseSchema.extend({
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),
    category: categorySchema.nullish(),
    userId: z.number().positive()
});

const taskReturnSchema = taskSchema.omit({category: true}).extend({ categoryId: z.number().positive().nullish()});

const taskCreateSchema = taskReturnSchema.omit({id: true, finished: true, userId: true});

const taskUpdateSchema = taskReturnSchema.omit({id: true, userId: true});


export { taskSchema, taskCreateSchema, taskReturnSchema , taskUpdateSchema };