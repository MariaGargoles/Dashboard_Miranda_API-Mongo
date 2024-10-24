import express, { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginController = express.Router();

interface userData {
    email: string | null;
    password: string | null;
    name: string | null;
    photo: string | null;
}

let userChecked: userData = { email: null, password: null, name: null, photo: null };

loginController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    console.log('Email recibido:', email);
    console.log('Contraseña recibida:', password);

    try {
        // Buscar el usuario por email (insensible a mayúsculas/minúsculas)
        const user = await UserModel.findOne({ email: new RegExp('^' + email + '$', 'i') }).exec();
        console.log('Usuario encontrado:', user);

        if (!user) {
            console.log('Email no encontrado:', email);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Verificar si la contraseña es correcta
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('Contraseña original:', password);  // Para verificar la entrada
        console.log('Contraseña almacenada (encriptada):', user.password);  // Para verificar en la base de datos
        console.log('¿Contraseña correcta?', isPasswordCorrect);  // Mostrar el resultado de la comparación

        if (!isPasswordCorrect) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generar un token JWT con expiración
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET || 'secretKey', { expiresIn: '1h' });
        console.log('Token generado:', token);

        // Preparar los datos del usuario para la respuesta (sin la contraseña)
        userChecked = {
            email: user.email,
            password: null,  // No devolver la contraseña
            name: user.name,
            photo: user.photo
        };

        return res.json({ Token: token, User: userChecked });

    } catch (error) {
        console.error('Error during login process:', error);
        return next(new Error('Error during login process'));
    }
});
