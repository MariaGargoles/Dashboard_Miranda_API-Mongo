import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { ErrorApi } from "../utils/error";

export const secretKey = process.env.TOKEN_SECRET || 'G7f#4jK@9mL2xP!v';

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export function authTokenMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        next(new ErrorApi('Invalid token', 403));
    }
}
