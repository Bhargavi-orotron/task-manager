import { Context } from 'hono'
import {genToken,generateResetToken,verifyToken} from '../utills/tokenUtils'
import {validate} from '../validations/validate'
import { EMAIL_NOT_EXISTS, FORGOT_EMAIL_SENT, FORGOT_VALID_ERROR, INV_CREDS, INVALID_TOKEN, LOGIN_SUCCESS, LOGIN_VALID_ERROR, PASSWORD_MISMATCH, PASSWORD_RESET_SUCCESS, RESET_VALID_ERROR, SIGNUP_SUCCESS, SIGNUP_VALID_ERROR,  TOKEN_USED, TOKEN_NOT_FOND, USER_EXISTS, USER_NOT_FOUND } from "../constants/messages";
import bcrypt from 'bcrypt';
import { InferOutput} from "valibot";
import { getSingleRecordByAColumnValue, saveRefreshToken, saveSingleRecord,getRecordById,updateRecordById } from '../services/baseDBService';
import { User, users } from '../connection/schema/users';
import { ValidateUserSchema } from '../validations/schemas/validateUserSchema'; 
import { ValidateLoginSchema } from '../validations/schemas/validateLoginSchema'
import { ValidateForgotSchema } from '../validations/schemas/validateForgotSchema';
import { ValidateResetSchema } from '../validations/schemas/validateResetSchema';
import dotenv from 'dotenv'
import {emailConfig} from '../config/emailConfig'
import BadRequestException from "../exceptions/badReqException";
import NotFoundException from "../exceptions/notFoundException";
import {jwtExpires} from '../config/jwt_config'
import {ResetPasswordToken,resetPasswordTokens} from '../connection/schema/resetPasswordTokens'
import {sendEmailToResetPassword} from '../services/emailService'
import { resetTokenVerify } from '../utills/tokenUtils';

dotenv.config()

export const signUp = async (c: Context) => {
    try {
        const reqBody = await c.req.json();

        const validData = await validate<typeof ValidateUserSchema>('user:signUp', reqBody, SIGNUP_VALID_ERROR);
        const existingUser = await getSingleRecordByAColumnValue<User>(users, 'email', reqBody.email)

        if (existingUser) {
            return c.json({ message: 'User already existsted' }, 409)
        }
        const hashedPassword = await bcrypt.hash(reqBody.password, 10);
        reqBody.password=hashedPassword
        const res = await saveSingleRecord<User>(users,reqBody);
        const { password:savedPassword, ...UserDetails } = res;
        return c.json({message:"User Signup successful",UserDetails},200)
    }
    catch(error){
        console.log(error);
        return c.json({message:"Internal Server Error"},500)
    }
}

export const login=async(c:Context)=>{
    try{
        const reqBody=await c.req.json()
        const validData = await validate<typeof ValidateLoginSchema>('user:login', reqBody, LOGIN_VALID_ERROR);
        const user=await getSingleRecordByAColumnValue<User>(users,'email',reqBody.email)
        if(!user){
            return c.json({message:"User not found"},404)
        }
        const isPasswordMatch=await bcrypt.compare(reqBody.password,user.password)
        if(!isPasswordMatch){
            return c.json({message:"Password does not match"},401)
        }
        const {password,...UserDetails}=user
        const token=await genToken(user.id)
        await saveRefreshToken({
            user_id:user.id,
            token:token.refresh_token
        })
        return c.json({message:"Login successful",data:UserDetails,token},200)
    }
    catch(error){
        console.log(error);
        return c.json({message:"Internal Server Error"},500)
    }
}

export const forgotPassword=async(c:Context)=>{
    try{
        const reqBody=await c.req.json()
        const validData = await validate<typeof ValidateForgotSchema>('password:forgot', reqBody, FORGOT_VALID_ERROR);
        const user=await getSingleRecordByAColumnValue<User>(users,'email',reqBody.email)
        if(!user){
            return c.json({message:"User not found"},404)
        }
        const payload = { userId: user.id, exp: Math.floor(Date.now() / 1000) + jwtExpires.expiresIn };
        const token=await generateResetToken(payload)
        await saveSingleRecord<ResetPasswordToken>(resetPasswordTokens,{token,user_id:user.id})
        const link=emailConfig.BASE_URL+`/auth/reset-password>token=${token}`
        await sendEmailToResetPassword(reqBody.email, link);
        return c.json({message:"Forgot password email link has been sent successfully"},200)
    }
    catch(error){
        console.log(error);
        return c.json({message:"Internal Server Error"},500)
    }
}

export const resetPassword=async(c:Context)=>{
    try{
        const reqBody=await c.req.json()
        const token = c.req.header('Authorization')?.split(' ')[1];
        const validData = await validate<typeof ValidateResetSchema>('password:reset', reqBody, RESET_VALID_ERROR);
        const resetData = validData as unknown as InferOutput<typeof ValidateResetSchema>;
        if (resetData.new_password !== resetData.confirm_password) {
            throw new BadRequestException(PASSWORD_MISMATCH);
        }
        const userId = await resetTokenVerify(token);
            if (!userId){
                throw new BadRequestException(INVALID_TOKEN);
            }
            const userData = await getRecordById<User>(users, userId);
            if (!userData){
                throw new NotFoundException(USER_NOT_FOUND);
            }

            const hashedPassword = await bcrypt.hash((validData as unknown as { new_password: string }).new_password, 10);
            userData.password = hashedPassword;
            
            await updateRecordById<User>(users, userData.id, {password: hashedPassword});
            await updateRecordById<ResetPasswordToken>(resetPasswordTokens, userId, {is_verified: true});

            return c.json({ message: PASSWORD_RESET_SUCCESS }, 200);
        } catch(error){
            throw error;
        }
    
}
