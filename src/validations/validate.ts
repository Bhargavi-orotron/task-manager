import { ValidateUserSchema } from "./schemas/validateUserSchema";
import { ValidateLoginSchema } from "./schemas/validateLoginSchema";
import UnProcessableEntityException from "../exceptions/unProcessableEntityException";
import { flatten, safeParseAsync } from "valibot";
import { AppActivity, ValidateReq } from "../types/appTypes";
import { ValidateForgotSchema } from "./schemas/validateForgotSchema";
import { ValidateResetSchema } from "./schemas/validateResetSchema";

export const validate=async<R extends ValidateReq>(actionType:AppActivity,reqData:any,errMsg:string)=>{
    let schema;
    switch(actionType){
        case 'user:signUp':
            schema=ValidateUserSchema;
            break;
        case 'user:login':
            schema=ValidateLoginSchema;
            break;
        case 'password:forgot':
            schema=ValidateForgotSchema
            break;
        case 'password:reset':
            schema=ValidateResetSchema
            break;
    }

const res = await safeParseAsync(schema!, reqData, { abortEarly: false});
    if (!res.success){
        const errData = flatten(res.issues).nested
        throw new UnProcessableEntityException(errMsg, errData);
    }
    return res.output as R;
}