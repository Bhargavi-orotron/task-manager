import { Hono } from 'hono'
import { Context } from 'hono'
import {validate} from '../validations/validate'
import bcrypt from 'bcrypt'
import { getSingleRecordByAColumnValue, saveSingleRecord } from '../services/baseDBService';
import { User, users } from '../connection/schema/users';
import { ValidateUserSchema } from '../validations/schemas/validateUserSchema'; 
import { SIGNUP_VALID_ERROR } from '../constants/messages';

export const signUp = async (c: Context) => {
    try {
        const reqBody = await c.req.json();

        const validData = await validate<typeof ValidateUserSchema>('user:signUp', reqBody, SIGNUP_VALID_ERROR);
        const existingUser = await getSingleRecordByAColumnValue(users, 'email', reqBody.email)

        if (existingUser) {
            return c.json({ message: 'User already existsted' }, 409)
        }
        const hashedPassword = await bcrypt.hash(reqBody.password, 10);
        const res = await saveSingleRecord(users,reqBody);
        const { password, ...UserDetails } = res;
        return c.json({message:"User Signup successful",UserDetails},200)
    }
    catch(error){
        console.log(error);
        return c.json({message:"Internal Server Error"},500)
    }
}