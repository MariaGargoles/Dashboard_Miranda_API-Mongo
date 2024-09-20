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
exports.BookingService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class BookingService {
    constructor() {
        this.bookings = [];
        this.nextId = 1;
    }
    static put(arg0, put) {
        throw new Error("Method not implemented.");
    }
    static deleteID(arg0, deleteID) {
        throw new Error("Method not implemented.");
    }
    static post(arg0, post) {
        throw new Error("Method not implemented.");
    }
    static getId(arg0, getId) {
        throw new Error("Method not implemented.");
    }
    static getAll(arg0, getAll) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookings;
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = this.bookings.find(booking => booking.id === id) || null;
            return booking;
        });
    }
    post(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item.Name || !item.OrderDate || !item.CheckIn || !item.CheckOut || !item.RoomType || !item.roomId) {
                throw new Error('Bad Request: Missing required fields');
            }
            item.id = this.nextId++;
            this.bookings.push(item);
            this.saveToFile();
            return item;
        });
    }
    deleteID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.bookings = this.bookings.filter(booking => booking.id !== id);
            this.saveToFile();
            return this.bookings;
        });
    }
    put(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.bookings.findIndex(booking => booking.id === update.id);
            if (index !== -1) {
                this.bookings[index] = update;
                this.saveToFile();
                return this.bookings[index];
            }
            return null;
        });
    }
    saveToFile() {
        const filePath = path_1.default.join(__dirname, '../data/bookings.json');
        fs_1.default.writeFileSync(filePath, JSON.stringify(this.bookings, null, 2), 'utf-8');
    }
}
exports.BookingService = BookingService;
