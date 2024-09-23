import { Identifiable } from "./id";


export interface User extends Identifiable {
    
    name: string;
    photo: string;
    startDate: Date;
    description: string;
    email: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE";
    password: string;
  }