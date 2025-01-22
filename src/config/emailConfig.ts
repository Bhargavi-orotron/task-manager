import dotenv from 'dotenv';
dotenv.config();

const port=Number(process.env.PORT)!

export const emailConfig = {
    API_KEY: process.env.BREVO_API_KEY,
    FROM_EMAIL: process.env.FROM_EMAIL,
    FROM_NAME: process.env.FROM_NAME,
    BASE_URL: 'http://localhost:${port}'
}