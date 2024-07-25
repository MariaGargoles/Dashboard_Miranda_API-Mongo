import { Identifiable } from "../interfaces/id";

export interface Booking extends Identifiable {
    Name: string;
    OrderDate: string;
    CheckIn: string;
    CheckOut: string;
    SpecialRequest: string;
    RoomType: string;
    RoomNumber: string;
    Status: string;
}
