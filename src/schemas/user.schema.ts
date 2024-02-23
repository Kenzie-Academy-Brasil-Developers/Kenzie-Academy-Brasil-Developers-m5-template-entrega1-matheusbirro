import { z } from "zod";
import { baseSchema } from "./base.schema";

const userSchema = baseSchema.extend({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(1),
});

const userCreateSchema = userSchema.omit({id: true});

const userReturnSchema = userSchema.omit({password: true});

export { userSchema, userCreateSchema, userReturnSchema};