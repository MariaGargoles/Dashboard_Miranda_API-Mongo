import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../middleware/auth';

export const hardcodedUser = {
    username: 'maria',
    password: 'miranda'
};

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username === hardcodedUser.username && password === hardcodedUser.password) {
        const token = jwt.sign({ username: hardcodedUser.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};
