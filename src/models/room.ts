import { Schema, model } from "mongoose";
import { Room } from "../interfaces/room"; 
import { Identifiable as IdentifiableInterface } from "../interfaces/id";

export const RoomSchema = new Schema<Room & IdentifiableInterface>({
    photo: { type: String, required: true },
    number: { type: String, required: true },
    bedType: { type: String, required: true }, 
    amenities: { type: [String], required: true },
    rate: { type: Number, required: true }, 
    offerPrice: { type: Number, required: true }, 
    status: { type: String, enum: ["Available", "Booked"], required: true },
    roomFloor: { type: String, required: true } 
});

export const RoomModel = model<Room & IdentifiableInterface>('Room', RoomSchema);
