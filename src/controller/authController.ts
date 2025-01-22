import { Context } from 'hono'; 
import {Hono} from 'hono'
import { getUserByIdFromDB} from '../services/baseDBService'; 
import { verifyToken } from '../utills/tokenUtils';  

export const getById = async (c: Context) => {
    try {
        const userId = Number(c.req.param('id'));
        if (!userId) {
            return c.json({ message: 'User ID is required' }, 400);
        }
        const token = c.req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return c.json({ message: 'Token is required' }, 401);
        }
        const requestingUserId = await verifyToken(token);
        if (userId !== requestingUserId.id) {
            return c.json({ message: 'You do not have permission to view this user data' }, 403);
        }

        const user = await getUserByIdFromDB(userId);
        if (!user) {
            return c.json({ message: 'User not found' }, 404); 
        }
        return c.json({ message: 'User fetched successfully', data: user }, 200);

    } catch (error) {
        console.log(error);
        return c.json({ message: 'Internal Server Error' }, 500); 
    }
};

