import { ServiceController } from "../interfaces/service";
import { Booking } from "../interfaces/booking";

export class BookingService implements ServiceController<Booking> {
    private bookings: Booking[] = [];

    async getAll(): Promise<Booking[]> {
        return this.bookings;
    }

    async getId(id: string): Promise<Booking | null> {
        const numericId = parseInt(id, 10);
        return this.bookings.find(booking => booking.id === numericId) || null;
    }

    async post(item: Booking): Promise<Booking[]> {
        this.bookings.push(item);
        return this.bookings;
    }

    async deleteID(id: string): Promise<Booking[]> {
        const numericId = parseInt(id, 10);
        this.bookings = this.bookings.filter(booking => booking.id !== numericId);
        return this.bookings;
    }

    async put(update: Booking): Promise<Booking[] | null> {
        const existingBooking = this.bookings.find(booking => booking.id === update.id);
        if (existingBooking) {
            this.bookings = this.bookings.map(booking =>
                booking.id === update.id ? update : booking
            );
            return this.bookings;
        }
        return null;
    }
}
