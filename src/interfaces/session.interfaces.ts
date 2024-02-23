import { z } from "zod";
import { sessionCreateSchema, sessionReturnSchema} from "../schemas/session.schema";

type SessionCreate = z.infer<typeof sessionCreateSchema>;
type SessionReturn = z.infer<typeof sessionReturnSchema>;

export { SessionCreate, SessionReturn }