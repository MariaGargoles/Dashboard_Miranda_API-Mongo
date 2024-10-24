import { Identifiable } from "../interfaces/id";
import mongoose from "mongoose";

export interface Booking extends Identifiable {
    roomId: mongoose.Types.ObjectId;
    Name: string;
    OrderDate: Date;
    CheckIn: Date;
    CheckOut: Date;
    SpecialRequest: string;
    RoomType: string;
    RoomNumber: number;
    Status: "Check In" | "In Progress" | "Check Out";
}
