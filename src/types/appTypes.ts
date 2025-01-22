import { ValidateUserSchema } from "../validations/schemas/validateUserSchema";
import { ValidateLoginSchema } from "../validations/schemas/validateLoginSchema";
import {ValidateForgotSchema} from '../validations/schemas/validateForgotSchema'
import {ValidateResetSchema} from '../validations/schemas/validateResetSchema'

export type UserActivity='user:signUp' | 'user:login' 
export type PasswordActivity = 'password:forgot' | 'password:reset'

export type AppActivity=UserActivity | PasswordActivity

export type ValidateReq=typeof ValidateUserSchema | typeof ValidateLoginSchema | typeof ValidateForgotSchema | typeof ValidateResetSchema
