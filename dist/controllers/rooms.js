"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../services/room");
const controller_1 = require("../utils/controller");
const express_1 = __importDefault(require("express"));
const roomHandler = new room_1.RoomService();
const roomRouter = express_1.default.Router();
const { getAll, getId, post, deleteID, update } = (0, controller_1.ControllersGeneric)(roomHandler);
roomRouter.get('/', getAll);
roomRouter.get('/:id', getId);
roomRouter.post('/', post);
roomRouter.delete('/:id', deleteID);
roomRouter.patch('/:id', update);
exports.default = roomRouter;
