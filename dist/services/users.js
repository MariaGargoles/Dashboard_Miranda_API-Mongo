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
exports.UserService = void 0;
const services_1 = require("../utils/services");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../utils/error");
class UserService extends services_1.ServicesGeneric {
    static post(_userData) {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super(user_1.UserModel);
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.model.findOne({ email: user.email }).exec();
                if (existingUser) {
                    throw error_1.ErrorApi.fromMessage('User already exists').withStatus(400);
                }
                const saltRounds = 10;
                const hashedPassword = yield bcryptjs_1.default.hash(user.password, saltRounds);
                const userWithHashedPassword = Object.assign(Object.assign({}, user), { password: hashedPassword });
                const newUser = yield this.model.create(userWithHashedPassword);
                return newUser;
            }
            catch (error) {
                if (error instanceof error_1.ErrorApi) {
                    throw error;
                }
                throw error_1.ErrorApi.fromMessage('Failed to add user').withStatus(500);
            }
        });
    }
}
exports.UserService = UserService;
