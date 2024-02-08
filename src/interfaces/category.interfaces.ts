import { z } from "zod";
import { categoryCreateSchema, categorySchema } from "../schemas";

type category = z.infer<typeof categorySchema>;
type categoryCreate = z.infer<typeof categoryCreateSchema>;

export { category, categoryCreate };