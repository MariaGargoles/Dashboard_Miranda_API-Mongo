"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const jsonFilePath = path.join(__dirname, 'rooms.json');
const csvFilePath = path.join(__dirname, 'rooms.csv');
const data = fs.readFileSync(jsonFilePath, { encoding: 'utf8' });
const rooms = JSON.parse(data);
rooms.sort((a, b) => a.OfferPrice - b.OfferPrice);
const cvsColumns = 'photo,number,id,BedType,Amenities,Rate,OfferPrice,Status,RoomFloor\n';
const csvRows = rooms.map((room) => {
    const exitCSV = (field) => `"${String(field).replace(/"/g, '""')}"`;
    const amenities = room.Amenities.join(';');
    return `${exitCSV(room.photo)},${exitCSV(room.number)},${exitCSV(room.id)},${exitCSV(room.BedType)},${exitCSV(amenities)},${exitCSV(room.Rate)},${exitCSV(room.OfferPrice)},${exitCSV(room.Status)},${exitCSV(room.RoomFloor)}`;
}).join('\n');
const csvData = cvsColumns + csvRows;
fs.writeFileSync(csvFilePath, csvData, { encoding: 'utf8' });
console.log('CSV file has been written successfully.');
