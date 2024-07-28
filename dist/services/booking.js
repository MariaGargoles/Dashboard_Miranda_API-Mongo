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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
class BookingService {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(this.bookings);
        });
    }
    static getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(req.params.id, 10);
            const booking = this.bookings.find(booking => booking.id === numericId) || null;
            if (booking) {
                res.json(booking);
            }
            else {
                res.status(404).send('Not Found');
            }
        });
    }
    static post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = req.body;
            this.bookings.push(item);
            res.status(201).json(this.bookings);
        });
    }
    static deleteID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(req.params.id, 10);
            this.bookings = this.bookings.filter(booking => booking.id !== numericId);
            res.json(this.bookings);
        });
    }
    static put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = req.body;
            const index = this.bookings.findIndex(booking => booking.id === update.id);
            if (index !== -1) {
                this.bookings[index] = update;
                res.json(this.bookings);
            }
            else {
                res.status(404).send('Not Found');
            }
        });
    }
}
exports.BookingService = BookingService;
BookingService.bookings = [];
