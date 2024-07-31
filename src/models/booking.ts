
import { Schema, model} from "mongoose";
import { Identifiable as IdentifiableInterface} from "../interfaces/id";
import { Booking as BookingInterface } from "../interfaces/booking";

 export const BookingSchema = new Schema<BookingInterface & IdentifiableInterface>({
    id: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    OrderDate: { type: Date, required: true },
    CheckIn: { type: Date, required: true },
    CheckOut: { type: Date, required: true },
    SpecialRequest: { type: String, required: true },
    RoomType: { type: String, required: true },
    RoomNumber: { type: Number, required: true },
    Status: { type: String, enum: ["Check In", "In Progress", "Check Out"], required: true }
});

export const BookingModel = model<BookingInterface & IdentifiableInterface>('Booking', BookingSchema);


