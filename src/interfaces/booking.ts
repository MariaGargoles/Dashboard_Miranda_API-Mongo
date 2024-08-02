import { Identifiable } from "../interfaces/id";

export interface Booking extends Identifiable {
    roomId: any;
    Name: string;
    OrderDate: Date;
    CheckIn: Date;
    CheckOut: Date;
    SpecialRequest: string;
    RoomType: string;
    RoomNumber: number;
    Status: "Check In" | "In Progress" | "Check Out";
}
