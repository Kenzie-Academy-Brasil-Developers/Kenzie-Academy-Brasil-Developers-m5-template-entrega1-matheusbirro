import { z } from "zod";
import { categoryCreateSchema, categoryReturnSchema, categorySchema } from "../schemas";

type category = z.infer<typeof categorySchema>;
type categoryCreate = z.infer<typeof categoryCreateSchema>;
type categoryReturn = z.infer<typeof categoryReturnSchema>;

export { category, categoryCreate, categoryReturn };