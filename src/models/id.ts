
import { Schema } from "mongoose";
import { Identifiable } from "../interfaces/id";

const IdentifiableSchema = new Schema<Identifiable>({
    id: { type: Number, required: true, unique: true }
});

export { IdentifiableSchema };
