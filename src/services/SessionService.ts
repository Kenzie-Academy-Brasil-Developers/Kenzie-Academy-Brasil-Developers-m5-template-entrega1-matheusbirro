import { compare } from "bcryptjs";
import { prisma } from "../database/prisma";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces/session.interfaces";
import { sign } from "jsonwebtoken";
import { UserReturn } from "../interfaces/user.interface";
import { userReturnSchema } from "../schemas";

export class SessionService {
    public login = async ({email, password}: SessionCreate): Promise<SessionReturn> =>{
        
        const foundUser = await prisma.user.findFirst({where: {email:email}});
        
        if (!foundUser) {
            throw new AppError("User not exists", 404);
        }

        const pwdMatch = await compare(password, foundUser.password);

        if (!pwdMatch) {
            throw new AppError("Email and password doesn't match", 401);
        }


        const secret = process.env.JWT_SECRET!;
        const expiresIn = process.env.EXPIRES_IN!;        

        const accessToken = sign({}, secret, { 
            expiresIn, 
            subject: foundUser.id.toString(),
        });

        return { 
            accessToken: accessToken,
            user: {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email
            }
        }
    } 

    public autoLogin = async (userId: string): Promise<UserReturn> =>{
        const foundUser = await prisma.user.findFirst({where: {id: Number(userId)}});

        return userReturnSchema.parse(foundUser);
    }
}