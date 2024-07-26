import { Identifiable } from "./id";


export interface Room extends Identifiable {
    photo: string;
    number: number;
    BedType: string;
    Amenities: string [];
    Rate: number;
    OfferPrice: number;
    Status: string; 
    RoomFloor: string;
  }