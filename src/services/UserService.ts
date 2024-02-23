import { hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { UserCreate, UserReturn } from "../interfaces/user.interface";
import { userReturnSchema } from "../schemas";

export class UserService {
    public create = async(payload: UserCreate):Promise<UserReturn> => {
        payload.password = await hash(payload.password, 10);
        
        const newUser = await prisma.user.create({data: payload})

        return userReturnSchema.parse(newUser);
    }
}