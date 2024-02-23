import { z } from "zod";
import { userCreateSchema, userReturnSchema, userSchema } from "../schemas";


type User = z.infer<typeof userSchema>
type UserCreate = z.infer<typeof userCreateSchema>
type UserReturn = z.infer<typeof userReturnSchema>

export{User, UserCreate, UserReturn}