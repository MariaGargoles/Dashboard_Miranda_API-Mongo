import { Booking } from "../interfaces/booking";
import fs from 'fs';
import path from 'path';

export class BookingService {
    private bookings: Booking[] = [];
    private nextId = 1;

    async getAll(): Promise<Booking[]> {
        return this.bookings;
    }

    async getId(id: number): Promise<Booking | null> {
        const booking = this.bookings.find(booking => booking.id === id) || null;
        return booking;
    }

    async post(item: Booking): Promise<Booking> {
        if (!item.Name || !item.OrderDate || !item.CheckIn || !item.CheckOut || !item.RoomType || !item.roomId) {
            throw new Error('Bad Request: Missing required fields');
        }

        item.id = this.nextId++;
        this.bookings.push(item);
        this.saveToFile();
        return item;
    }

    async deleteID(id: number): Promise<Booking[]> {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
        this.saveToFile();
        return this.bookings;
    }

    async put(update: Booking): Promise<Booking | null> {
        const index = this.bookings.findIndex(booking => booking.id === update.id);
        if (index !== -1) {
            this.bookings[index] = update;
            this.saveToFile();
            return this.bookings[index];
        }
        return null;
    }

    private saveToFile(): void {
        const filePath = path.join(__dirname, '../data/bookings.json');
        fs.writeFileSync(filePath, JSON.stringify(this.bookings, null, 2), 'utf-8');
    }
}
