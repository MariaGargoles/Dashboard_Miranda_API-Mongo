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
const booking_1 = require("../models/booking");
const error_1 = require("../utils/error");
const services_1 = require("../utils/services");
class BookingService extends services_1.ServicesGeneric {
    static put(_arg0, _put) {
        throw new Error("Method not implemented.");
    }
    static deleteID(_arg0, _deleteID) {
        throw new Error("Method not implemented.");
    }
    static post(_arg0, _post) {
        throw new Error("Method not implemented.");
    }
    static getId(_arg0, _getId) {
        throw new Error("Method not implemented.");
    }
    static getAll(_arg0, _getAll) {
        throw new Error("Method not implemented.");
    }
    post() {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super(booking_1.BookingModel);
    }
    addBooking(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingBooking = yield this.model.findOne({
                    roomId: booking.roomId,
                    CheckIn: booking.CheckIn,
                    CheckOut: booking.CheckOut
                }).exec();
                if (existingBooking) {
                    throw error_1.ErrorApi.fromMessage('Booking already exists for the selected room and dates').withStatus(400);
                }
                const newBooking = yield this.model.create(booking);
                return newBooking;
            }
            catch (error) {
                if (error instanceof error_1.ErrorApi) {
                    throw error;
                }
                throw error_1.ErrorApi.fromMessage('Failed to add booking').withStatus(500);
            }
        });
    }
    updateBooking(id, bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBooking = yield this.model.findByIdAndUpdate(id, bookingData, { new: true }).exec();
                if (!updatedBooking) {
                    throw error_1.ErrorApi.fromMessage('Booking not found').withStatus(404);
                }
                return updatedBooking;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to update booking').withStatus(500);
            }
        });
    }
    deleteBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBooking = yield this.model.findByIdAndDelete(id).exec();
                if (!deletedBooking) {
                    throw error_1.ErrorApi.fromMessage('Booking not found').withStatus(404);
                }
                return deletedBooking;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to delete booking').withStatus(500);
            }
        });
    }
    getBookingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield this.model.findById(id).exec();
                if (!booking) {
                    throw error_1.ErrorApi.fromMessage('Booking not found').withStatus(404);
                }
                return booking;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to get booking').withStatus(500);
            }
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.model.find().exec();
                return bookings;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to get bookings').withStatus(500);
            }
        });
    }
}
exports.BookingService = BookingService;
