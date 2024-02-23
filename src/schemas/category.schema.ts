import { z } from "zod";
import { baseSchema } from "./base.schema";

const categorySchema = baseSchema.extend({
    name: z.string(),
    userId: z.number()
})

const categoryCreateSchema = categorySchema.omit({id: true, userId: true});

export { categoryCreateSchema, categorySchema };