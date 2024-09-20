import { Identifiable } from "./id";
import { Types } from 'mongoose';

export interface ContactMessage extends Identifiable {
    _id?: Types.ObjectId;
    date: Date;
    name: string;
    email: string;
    subject: string;
    comment: string;
    action: "publish" | "archived";
}
