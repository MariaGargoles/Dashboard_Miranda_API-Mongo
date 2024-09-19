import { User } from '../interfaces/user';
import fs from 'fs';
import path from 'path';
import usersData from '../data/users.json';
import bcrypt from 'bcrypt';

export class UserService  {
    private static users: User[] = this.convertUsers(usersData);

    static async getAll(): Promise<User[]> {
        return this.users;
    }

    static async getId(id: string): Promise<User | null> {
        const numericId = parseInt(id, 10);
        return this.users.find(user => user.id === numericId) || null;
    }

    static async post(item: User): Promise<User> {
        
        const hashedPassword = await bcrypt.hash(item.password, 10);
        const newUser = { ...item, password: hashedPassword };

        this.users.push(newUser);
        this.saveToFile();
        return newUser;
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

    private static convertUsers(usersData: any[]): User[] {
        return usersData.map(user => ({
            ...user,
            startDate: new Date(user.startDate) 
        }));
    }
}
