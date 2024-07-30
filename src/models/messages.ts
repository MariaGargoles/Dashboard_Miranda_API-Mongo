import { Schema, model } from "mongoose";
import { ContactMessage } from "../interfaces/messages";

export const MessageSchema = new Schema<ContactMessage>({
    date: {type: Date, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    comment: {type: String, required: true},
    action: { type: String, enum: ["publish", "archived"], required: true },
})

export const MessageModel = model<ContactMessage>('Message', MessageSchema);