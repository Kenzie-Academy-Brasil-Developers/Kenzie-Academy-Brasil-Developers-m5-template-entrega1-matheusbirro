import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "./user.schema";


const sessionCreateSchema = userCreateSchema.pick({email: true, password: true});
const sessionReturnSchema = z.object({
    accessToken: z.string(),
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email()
    })
})

export{ sessionCreateSchema, sessionReturnSchema }