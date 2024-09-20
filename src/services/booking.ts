import { Booking } from '../interfaces/booking';
import { BookingModel } from "../models/booking";
import { ErrorApi } from "../utils/error";
import { ServicesGeneric } from "../utils/services";

export class BookingService extends ServicesGeneric<Booking> {
    static put(_arg0: string, _put: any) {
        throw new Error("Method not implemented.");
    }
    static deleteID(_arg0: string, _deleteID: any) {
        throw new Error("Method not implemented.");
    }
    static post(_arg0: string, _post: any) {
        throw new Error("Method not implemented.");
    }
    static getId(_arg0: string, _getId: any) {
        throw new Error("Method not implemented.");
    }
    static getAll(_arg0: string, _getAll: any) {
        throw new Error("Method not implemented.");
    }
    post() {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super(BookingModel);
    }

    async addBooking(booking: Booking): Promise<Booking> {
        try {
            const existingBooking = await this.model.findOne({
                roomId: booking.roomId,
                CheckIn: booking.CheckIn,
                CheckOut: booking.CheckOut
            }).exec();

            if (existingBooking) {
                throw ErrorApi.fromMessage('Booking already exists for the selected room and dates').withStatus(400);
            }

            const newBooking = await this.model.create(booking);
            return newBooking;
        } catch (error) {
            if (error instanceof ErrorApi) {
                throw error;
            }
            throw ErrorApi.fromMessage('Failed to add booking').withStatus(500);
        }
    }

    async updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking | null> {
        try {
            const updatedBooking = await this.model.findByIdAndUpdate(id, bookingData, { new: true }).exec();
            if (!updatedBooking) {
                throw ErrorApi.fromMessage('Booking not found').withStatus(404);
            }
            return updatedBooking;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to update booking').withStatus(500);
        }
    }

    async deleteBooking(id: string): Promise<Booking | null> {
        try {
            const deletedBooking = await this.model.findByIdAndDelete(id).exec();
            if (!deletedBooking) {
                throw ErrorApi.fromMessage('Booking not found').withStatus(404);
            }
            return deletedBooking;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to delete booking').withStatus(500);
        }
    }

    async getBookingById(id: string): Promise<Booking | null> {
        try {
            const booking = await this.model.findById(id).exec();
            if (!booking) {
                throw ErrorApi.fromMessage('Booking not found').withStatus(404);
            }
            return booking;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to get booking').withStatus(500);
        }
    }

    async getAllBookings(): Promise<Booking[]> {
        try {
            const bookings = await this.model.find().exec();
            return bookings;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to get bookings').withStatus(500);
        }
    }
}
