import { Room } from '../interfaces/room';
import fs from 'fs';
import path from 'path';

export class RoomService {
    private static rooms: Room[];

    static {
        const filePath = path.join(__dirname, '../data/rooms.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        this.rooms = JSON.parse(jsonData);
    }

    static async getAll(): Promise<Room[]> {
        return this.rooms;
    }

    static async getId(id: string): Promise<Room | null> {
        const numericId = parseInt(id, 10);
        return this.rooms.find(room => room.id === numericId) || null;
    }

    static async post(item: Room): Promise<Room[]> {
        this.rooms.push(item);
        this.saveToFile();
        return this.rooms;
    }

    static async deleteID(id: string): Promise<Room[]> {
        const numericId = parseInt(id, 10);
        this.rooms = this.rooms.filter(room => room.id !== numericId);
        this.saveToFile();
        return this.rooms;
    }

    static async put(update: Room): Promise<Room[] | null> {
        const index = this.rooms.findIndex(room => room.id === update.id);
        if (index !== -1) {
            this.rooms[index] = update;
            this.saveToFile();
            return this.rooms;
        }
        return null;
    }

    private static saveToFile(): void {
        const filePath = path.join(__dirname, '../data/rooms.json');
        fs.writeFileSync(filePath, JSON.stringify(this.rooms, null, 2), 'utf-8');
    }
}
