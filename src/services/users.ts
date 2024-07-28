import { User } from '../interfaces/user';
import fs from 'fs';
import path from 'path';

export class UserService {
    private static users: User[];

    static {
        const filePath = path.join(__dirname, '../data/users.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        this.users = JSON.parse(jsonData);
    }

    static async getAll(): Promise<User[]> {
        return this.users;
    }

    static async getId(id: string): Promise<User | null> {
        const numericId = parseInt(id, 10);
        const user = this.users.find(user => user.id === numericId) || null;
        return user;
    }

    static async post(item: User): Promise<User[]> {
        this.users.push(item);
        this.saveToFile();
        return this.users;
    }

    static async deleteID(id: string): Promise<User[]> {
        const numericId = parseInt(id, 10);
        this.users = this.users.filter(user => user.id !== numericId);
        this.saveToFile();
        return this.users;
    }

    static async put(update: User): Promise<User[] | null> {
        const index = this.users.findIndex(user => user.id === update.id);
        if (index !== -1) {
            this.users[index] = update;
            this.saveToFile();
            return this.users;
        }
        return null;
    }

    private static saveToFile(): void {
        const filePath = path.join(__dirname, '../data/users.json');
        fs.writeFileSync(filePath, JSON.stringify(this.users, null, 2), 'utf-8');
    }
}
