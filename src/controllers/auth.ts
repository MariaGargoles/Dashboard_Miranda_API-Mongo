import express, { NextFunction, Request, Response } from 'express';
import { UserModel, User } from '../models/uniqueuser';
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

loginController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const checked = await checkUser(email, password);

    if (checked) {
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET || 'secretKey');
        userChecked.password = password;
        res.json({ Token: token, User: userChecked });
    } else {
        const error = new Error('Invalid Credentials');
        next(error);
    }
});

async function checkUser(email: string, password: string): Promise<boolean> {
    try {
        const user = await UserModel.findOne({ email: email }).exec() as User;
        if (user) {
            userChecked = { email: user.email, password: user.password, name: user.name, photo: user.photo };
            return await bcrypt.compare(password, user.password);
        } else {
            return false;
        }
    } catch (error) {
        throw new Error('Error fetching user');
    }
}
