import { Identifiable } from "./id";

export interface ContactMessage extends Identifiable {
     
    date: Date;
    name: string;
    email: string;
    subject: string;
    comment: string;
    action: "publish" | "archived";
}
