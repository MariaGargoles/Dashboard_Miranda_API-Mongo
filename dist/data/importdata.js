"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("../mongodb");
const room_1 = require("../models/room");
const user_1 = require("../models/user");
const booking_1 = require("../models/booking");
const messages_1 = require("../models/messages");
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongodb_1.connectDB)();
        const roomsData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'rooms.json'), 'utf-8'));
        const usersData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'users.json'), 'utf-8'));
        const bookingData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'booking.json'), 'utf-8'));
        const messagesData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'ContactMessages.json'), 'utf-8'));
        yield room_1.RoomModel.insertMany(roomsData);
        yield user_1.UserModel.insertMany(usersData);
        yield booking_1.BookingModel.insertMany(bookingData);
        yield messages_1.MessageModel.insertMany(messagesData);
        console.log('Datos importados correctamente');
        process.exit();
    }
    catch (error) {
        console.error('Error al importar datos', error);
        process.exit(1);
    }
});
importData();
