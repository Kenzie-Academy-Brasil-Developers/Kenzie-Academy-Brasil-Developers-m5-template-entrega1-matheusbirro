import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";

const taskSchema = baseSchema.extend({
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),
    category: categorySchema.nullish(),
});

const taskReturnSchema = taskSchema.omit({category: true}).extend({ categoryId: z.number().positive().nullish()});

const taskCreateSchema = taskReturnSchema.omit({id: true, finished: true});

const taskUpdateSchema = taskReturnSchema.omit({id: true});


export { taskSchema, taskCreateSchema, taskReturnSchema , taskUpdateSchema };