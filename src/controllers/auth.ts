import express, { Request, Response } from 'express';
import { UserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginController = express.Router();



// Endpoint POST /login
loginController.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: new RegExp(`^${email}$`, 'i') }).exec();
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.TOKEN_SECRET || 'secretKey',
            { expiresIn: '1h' }
        );

        const userChecked = {
            email: user.email,
            name: user.name,
            photo: user.photo,
        };

        return res.status(200).json({ token, user: userChecked });
    } catch (error) {
        console.error('Error during login process:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
