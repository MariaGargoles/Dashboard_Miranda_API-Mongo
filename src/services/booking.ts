import { Booking } from '../interfaces/booking';
import data from "../data/Booking.json"; 

export class BookingService {
    private bookings: Booking[];

    constructor() {
        this.bookings = data;
    }

   
    public getAllBookings(): Booking[] {
        return this.bookings;
    }

 
    public getBookingById(id: string): Booking | undefined {
        const numericId = parseInt(id, 10);
        return this.bookings.find(booking => booking.id === numericId);
    }

  
    public createBooking(newBooking: Booking): Booking {
        this.bookings.push(newBooking);
        return newBooking;
    }

  
    public updateBooking(id: string, updatedBooking: Partial<Booking>): Booking | undefined {
        const numericId = parseInt(id, 10);
        const bookingIndex = this.bookings.findIndex(booking => booking.id === numericId);

        if (bookingIndex !== -1) {
            this.bookings[bookingIndex] = {
                ...this.bookings[bookingIndex],
                ...updatedBooking
            };
            return this.bookings[bookingIndex];
        }

        return undefined;
    }

    
    public deleteBooking(id: string): boolean {
        const numericId = parseInt(id, 10);
        const bookingIndex = this.bookings.findIndex(booking => booking.id === numericId);

        if (bookingIndex !== -1) {
            this.bookings.splice(bookingIndex, 1);
            return true;
        }

        return false;
    }
}
