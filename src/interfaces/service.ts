import { Identifiable } from "./id";

export interface ServiceController<T extends Identifiable> {
    getAll(): Promise<T[]>;
    getId(id: string): Promise<T | null>;
    post(item: T): Promise<T[]>;  
    deleteID(id: string): Promise<T[]>;
    put(item: T): Promise<T[] | null>; 
}
