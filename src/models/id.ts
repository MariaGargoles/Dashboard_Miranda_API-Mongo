import { Schema, model } from "mongoose";
import { Identifiable } from "../interfaces/id";

export const IdentifiableSchema = new Schema<Identifiable>({
    id: {type: Number, required: true, unique: true }
});

export const BookingModel = model<Identifiable>('id', IdentifiableSchema);