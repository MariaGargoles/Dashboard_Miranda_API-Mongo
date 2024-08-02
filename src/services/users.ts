import { User } from '../interfaces/user';
import fs from 'fs';
import path from 'path';
import usersData from '../data/users.json';

export class UserService {
    private static users: User[] = this.convertUsers(usersData);

    static async getAll(): Promise<User[]> {
        return this.users;
    }

    static async getId(id: number): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    static async post(item: User): Promise<User> {
        this.users.push(item);
        this.saveToFile();
        return item; 
    }

    static async deleteID(id: number): Promise<User[]> {
        this.users = this.users.filter(user => user.id !== id);
        this.saveToFile();
        return this.users;
    }

    static async put(update: User): Promise<User | null> {
        const index = this.users.findIndex(user => user.id === update.id);
        if (index !== -1) {
            this.users[index] = update;
            this.saveToFile();
            return this.users[index]; 
        }
        return null;
    }

    private static saveToFile(): void {
        const filePath = path.join(__dirname, '../data/users.json');
        fs.writeFileSync(filePath, JSON.stringify(this.users, null, 2), 'utf-8');
    }

    private static convertUsers(usersData: any[]): User[] {
        return usersData.map(user => ({
            ...user,
            startDate: new Date(user.startDate) 
        }));
    }
}
