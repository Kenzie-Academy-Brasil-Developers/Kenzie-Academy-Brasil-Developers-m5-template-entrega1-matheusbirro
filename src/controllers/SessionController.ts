import { Request, Response } from "express"
import { SessionService } from "../services/SessionService"

export class SessionController {
    private sessionService = new SessionService()

    public login = async ( req: Request, res:Response): Promise<Response> =>{        
        const token = await this.sessionService.login(req.body);
        
        return res.status(200).json(token);
    }
    public autoLogin = async ( req: Request, res:Response): Promise<Response> =>{        
        const user = await this.sessionService.autoLogin(res.locals.decoded.sub);
        
        return res.status(200).json(user);
    }
}