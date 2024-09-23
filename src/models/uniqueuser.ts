import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
    name: string;
    photo: string; 
}

const userSchema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, required: false } 
});

export const UserModel = mongoose.model<User>('User', userSchema);
