import { Identifiable } from "../interfaces/id";

export interface ServiceController<T extends Identifiable> {
    getAll(): Promise<T[]>;
    getId(id: string): Promise<T | null>;
    post(item: T): Promise<T[]>;  
    deleteID(id: string): Promise<T[]>;
    put(item: T): Promise<T[] | null>; 
}

export class ServicesGeneric<T extends Identifiable> implements ServiceController<T> {
    private data: T[];

    constructor(initial: T[]) {
        this.data = initial;
    }

    async getAll(): Promise<T[]> {
        return this.data;
    }

    async getId(id: string): Promise<T | null> {
        const numericId = parseInt(id, 10);
        const item = this.data.find(item => item.id === numericId);
        return item || null;
    }

    async post(item: T): Promise<T[]> {
        this.data.push(item);
        return this.data;
    }

    async deleteID(id: string): Promise<T[]> {
        const numericId = parseInt(id, 10);
        this.data = this.data.filter(item => item.id !== numericId);
        return this.data; 
    }

    async put(update: T): Promise<T[] | null> {
        this.data = this.data.map(item => 
            item.id === update.id ? update : item);
        return this.data;
    }
}
