import {User} from "../connection/schema/users";
import { ValidateUserSchema } from "../validations/schemas/validateUserSchema";

export type UserActivity='user:signUp'
export type AppActivity=UserActivity

export type ValidateReq=typeof ValidateUserSchema
