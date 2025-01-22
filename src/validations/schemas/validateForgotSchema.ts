import { object } from "valibot";
import { ValidateEmailSchema} from "./validateUserSchema";

export const ValidateForgotSchema = object({
    email: ValidateEmailSchema
})