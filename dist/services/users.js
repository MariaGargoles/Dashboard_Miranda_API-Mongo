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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const users_json_1 = __importDefault(require("../data/users.json"));
class UserService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    static getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(id, 10);
            return this.users.find(user => user.id === numericId) || null;
        });
    }
    static post(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.push(item);
            this.saveToFile();
            return this.users;
        });
    }
    static deleteID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(id, 10);
            this.users = this.users.filter(user => user.id !== numericId);
            this.saveToFile();
            return this.users;
        });
    }
    static put(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex(user => user.id === update.id);
            if (index !== -1) {
                this.users[index] = update;
                this.saveToFile();
                return this.users;
            }
            return null;
        });
    }
    static saveToFile() {
        const filePath = path_1.default.join(__dirname, '../data/users.json');
        fs_1.default.writeFileSync(filePath, JSON.stringify(this.users, null, 2), 'utf-8');
    }
    static convertUsers(usersData) {
        return usersData.map(user => (Object.assign(Object.assign({}, user), { startDate: new Date(user.startDate) })));
    }
}
exports.UserService = UserService;
_a = UserService;
UserService.users = _a.convertUsers(users_json_1.default);
