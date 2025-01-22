import { InferOutput, object } from "valibot";
import { ValidateEmailSchema, ValidatePasswordSchema } from "./validateUserSchema";

export const ValidateLoginSchema = object({
    email: ValidateEmailSchema,
    password: ValidatePasswordSchema
});

export type ValidateLoginSchema = InferOutput<typeof ValidateLoginSchema>;