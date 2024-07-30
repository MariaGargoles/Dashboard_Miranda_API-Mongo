import { Schema, model } from "mongoose";
import { Booking } from "../interfaces/booking"; 

export const BookingSchema = new Schema<Booking>({
    Name: { type: String, required: true },
    OrderDate: { type: Date, required: true },
    CheckIn: { type: Date, required: true },
    CheckOut: { type: Date, required: true },
    SpecialRequest: { type: String, required: true },
    RoomType: { type: String, required: true },
    RoomNumber: { type: Number, required: true },
    Status: { type: String,enum: ["In Progress", "Check Out", "In Progress" ] , required: true }
});

export const BookingModel = model<Booking>('Booking', BookingSchema);