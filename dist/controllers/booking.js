"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const booking_1 = require("../services/booking");
exports.bookingRouter = express_1.default.Router();
exports.bookingRouter.get('/', booking_1.BookingService.getAll);
exports.bookingRouter.get('/:id', booking_1.BookingService.getId);
exports.bookingRouter.post('/', booking_1.BookingService.post);
exports.bookingRouter.delete('/:id', booking_1.BookingService.deleteID);
exports.bookingRouter.patch('/:id', booking_1.BookingService.put);
exports.default = exports.bookingRouter;
