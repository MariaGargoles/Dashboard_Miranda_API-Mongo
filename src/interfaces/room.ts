import { Identifiable } from "./id";


export interface Room extends Identifiable {
  photo: string;
  number: string;
  bedType: string;
  amenities: string[];
  rate: number;
  offerPrice: number;
  status: "Available" | "Booked";
  roomFloor: string;
}
  