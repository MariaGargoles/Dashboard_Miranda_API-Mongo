import { Identifiable } from "./id";


export interface User extends Identifiable {
    
    name: string;
    foto: string;
    startDate: string;
    description: string;
    email: string;
    contact: string;
    status: string;
  }