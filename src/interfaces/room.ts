import { Identifiable } from "./id";
import { Types } from 'mongoose';


export interface Room extends Identifiable {
  _id?: Types.ObjectId;
  name: any;
  photo: string;
  number: string;
  bedType: string;
  amenities: string[];
  rate: number;
  offerPrice: number;
  status: "Available" | "Booked";
  roomFloor: string;
}
  