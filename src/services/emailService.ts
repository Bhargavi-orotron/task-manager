import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export const sendEmailToResetPassword = async (recipientEmail: string, resetLink: string): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: 'Password Reset Request',
            text: `Hello,\n\nYou requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nThank you.`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending password reset email', error);
        throw new Error('Failed to send password reset email');
    }
};
