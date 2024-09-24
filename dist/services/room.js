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
exports.RoomService = void 0;
const room_1 = require("../models/room");
const error_1 = require("../utils/error");
const services_1 = require("../utils/services");
class RoomService extends services_1.ServicesGeneric {
    getRandomRoom() {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super(room_1.RoomModel);
    }
    addRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingRoom = yield this.model.findOne({ number: room.number }).exec();
                if (existingRoom) {
                    throw error_1.ErrorApi.fromMessage('Room with this number already exists').withStatus(400);
                }
                const newRoom = yield this.model.create(room);
                return newRoom;
            }
            catch (error) {
                if (error instanceof error_1.ErrorApi) {
                    throw error;
                }
                throw error_1.ErrorApi.fromMessage('Failed to add room').withStatus(500);
            }
        });
    }
    updateRoom(id, roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedRoom = yield this.model.findByIdAndUpdate(id, roomData, { new: true }).exec();
                if (!updatedRoom) {
                    throw error_1.ErrorApi.fromMessage('Room not found').withStatus(404);
                }
                return updatedRoom;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to update room').withStatus(500);
            }
        });
    }
    deleteRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRoom = yield this.model.findByIdAndDelete(id).exec();
                if (!deletedRoom) {
                    throw error_1.ErrorApi.fromMessage('Room not found').withStatus(404);
                }
                return deletedRoom;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to delete room').withStatus(500);
            }
        });
    }
    getRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield this.model.findById(id).exec();
                if (!room) {
                    throw error_1.ErrorApi.fromMessage('Room not found').withStatus(404);
                }
                return room;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to get room').withStatus(500);
            }
        });
    }
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield this.model.find().exec();
                return rooms;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to get rooms').withStatus(500);
            }
        });
    }
}
exports.RoomService = RoomService;
