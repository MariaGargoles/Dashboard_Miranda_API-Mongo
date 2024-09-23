"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    comment: { type: String, required: true },
    action: { type: String, enum: ["publish", "archived"], required: true },
});
exports.MessageModel = (0, mongoose_1.model)('Message', exports.MessageSchema);
