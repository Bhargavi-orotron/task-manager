import { ValidatePasswordSchema } from "./validateUserSchema";
import {object } from "valibot";

export const ValidateResetSchema = object({
    new_password: ValidatePasswordSchema,
    confirm_password: ValidatePasswordSchema

})