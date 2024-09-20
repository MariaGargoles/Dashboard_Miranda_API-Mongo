"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = exports.RoomSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RoomSchema = new mongoose_1.Schema({
    photo: { type: String, required: true },
    number: { type: String, required: true },
    bedType: { type: String, required: true },
    amenities: { type: [String], required: true },
    rate: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    status: { type: String, enum: ["Available", "Booked"], required: true },
    roomFloor: { type: String, required: true }
});
exports.RoomModel = (0, mongoose_1.model)('Room', exports.RoomSchema);
