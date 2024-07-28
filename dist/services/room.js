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
exports.RoomService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Rooms_json_1 = __importDefault(require("../data/Rooms.json"));
class RoomService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rooms;
        });
    }
    static getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(id, 10);
            return this.rooms.find(room => room.id === numericId) || null;
        });
    }
    static post(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rooms.push(item);
            this.saveToFile();
            return this.rooms;
        });
    }
    static deleteID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(id, 10);
            this.rooms = this.rooms.filter(room => room.id !== numericId);
            this.saveToFile();
            return this.rooms;
        });
    }
    static put(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.rooms.findIndex(room => room.id === update.id);
            if (index !== -1) {
                this.rooms[index] = update;
                this.saveToFile();
                return this.rooms;
            }
            return null;
        });
    }
    static saveToFile() {
        const filePath = path_1.default.join(__dirname, '../data/Rooms.json');
        fs_1.default.writeFileSync(filePath, JSON.stringify(this.rooms, null, 2), 'utf-8');
    }
}
exports.RoomService = RoomService;
RoomService.rooms = Rooms_json_1.default;
