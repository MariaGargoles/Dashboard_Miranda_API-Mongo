import express, { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginController = express.Router();

interface userData {
    email: string | null,
    password: string | null,
    name: string | null,
    photo: string | null
}

let userChecked: userData = {email: null, password: null, name: null, photo: null};

loginController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        
        const user = await UserModel.findOne({ email: new RegExp('^' + email + '$', 'i') }).exec();

        if (!user) {
            return res.status(401).json({ error: "Invalid email" });  
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid password" });  
        }

        
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET || 'secretKey');
        userChecked = { email: user.email, password: null, name: user.name, photo: user.photo };
        return res.json({ Token: token, User: userChecked });

    } catch (error) {
        return next(new Error('Error during login process'));
    }
});
