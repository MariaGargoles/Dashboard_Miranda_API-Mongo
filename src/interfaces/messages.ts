import { Identifiable } from "./id";

export interface ContactMessage extends Identifiable {
     
    date: string;
    name: string;
    email: string;
    subject: string;
    comment: string;
    action: string;
}
