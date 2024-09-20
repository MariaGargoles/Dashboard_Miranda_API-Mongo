"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifiableSchema = void 0;
const mongoose_1 = require("mongoose");
const IdentifiableSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true }
});
exports.IdentifiableSchema = IdentifiableSchema;
