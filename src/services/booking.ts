import { Booking } from "../interfaces/booking";
import { Request, Response } from 'express';

export class BookingService {
    private static bookings: Booking[] = [];

    static async getAll(_req: Request, res: Response): Promise<void> {
        res.json(this.bookings);
    }

    static async getId(req: Request, res: Response): Promise<void> {
        const numericId = parseInt(req.params.id, 10);
        const booking = this.bookings.find(booking => booking.id === numericId) || null;
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).send('Not Found');
        }
    }

    static async post(req: Request, res: Response): Promise<void> {
        const item: Booking = req.body;
        this.bookings.push(item);
        res.status(201).json(this.bookings);
    }

    static async deleteID(req: Request, res: Response): Promise<void> {
        const numericId = parseInt(req.params.id, 10);
        this.bookings = this.bookings.filter(booking => booking.id !== numericId);
        res.json(this.bookings);
    }

    static async put(req: Request, res: Response): Promise<void> {
        const update: Booking = req.body;
        const index = this.bookings.findIndex(booking => booking.id === update.id);
        if (index !== -1) {
            this.bookings[index] = update;
            res.json(this.bookings);
        } else {
            res.status(404).send('Not Found');
        }
    }
}
