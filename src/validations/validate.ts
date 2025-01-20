import { ValidateUserSchema } from "./schemas/validateUserSchema";
import UnProcessableEntityException from "../exceptions/unProcessableEntityException";
import { flatten, safeParseAsync } from "valibot";
import { AppActivity, ValidateReq } from "../types/appTypes";

export const validate=async<R extends ValidateReq>(actionType:AppActivity,reqData:any,errMsg:string)=>{
    let schema;
    switch(actionType){
        case 'user:signUp':
            schema=ValidateUserSchema;
            break;
    }

const res = await safeParseAsync(schema!, reqData, { abortEarly: false});
    if (!res.success){
        const errData = flatten(res.issues).nested
        throw new UnProcessableEntityException(errMsg, errData);
    }
    return res.output as R;
}