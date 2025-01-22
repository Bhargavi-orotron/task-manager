import jwt,{JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';
import { jwtExpires } from '../config/jwt_config'
import { getSingleRecordByAColumnValue } from '../services/baseDBService';
import { ResetPasswordToken, resetPasswordTokens } from '../connection/schema/resetPasswordTokens';
import NotFoundException from '../exceptions/notFoundException';
import BadRequestException from '../exceptions/badReqException';
import { TOKEN_NOT_FOND, TOKEN_USED } from '../constants/messages';
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET!;
const expiresIn=jwtExpires.expiresIn
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET!;


export const generateResetToken = async(payload: any) =>{
    const token = await jwt.sign(payload, process.env.JWT_SECRET as string);
    return token;
}

export const genToken=async(userId:number)=>{
    if(!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    const access_token=jwt.sign(
        {id:userId},
        JWT_SECRET,
        {expiresIn:Math.floor(Date.now() / 1000) + (expiresIn)}
    )
    const refresh_token=jwt.sign(
        {id:userId},
        REFRESH_TOKEN_SECRET,
        {expiresIn:Math.floor(Date.now() / 1000) + (expiresIn*3)}
    )
    return {access_token,refresh_token};
}


export const verifyToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        return decoded
    } catch (error) {
        console.error('Token verification failed');
        throw new Error('Unauthorized');
    }
};
export const resetTokenVerify = async(token:any) => {
    try {
        const columnsToSelect = ['user_id', 'token', 'is_verified'] as const;
        const tokenData = await getSingleRecordByAColumnValue<ResetPasswordToken>(resetPasswordTokens, 'token', token, columnsToSelect);

        if (!tokenData){
            throw new NotFoundException(TOKEN_NOT_FOND);
        }

        await verifyToken(tokenData.token);

        if (tokenData.is_verified === true){
            throw new BadRequestException(TOKEN_USED);
        }
        return tokenData.user_id;
    } catch (error){
        throw error;
    }
}  
