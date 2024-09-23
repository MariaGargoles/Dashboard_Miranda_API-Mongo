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
exports.loginController = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.loginController = express_1.default.Router();
let userChecked = { email: null, password: null, name: null, photo: null };
exports.loginController.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const checked = yield checkUser(email, password);
    if (checked) {
        const token = jsonwebtoken_1.default.sign({ email }, process.env.TOKEN_SECRET || 'secrectKey');
        userChecked.password = password;
        res.json({ Token: token, User: userChecked });
    }
    else {
        const error = new Error('Invalid Credentials');
        next(error);
    }
}));
function checkUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.UserModel.findOne({ email: email }).exec();
            if (user) {
                userChecked = { email: user.email, password: user.password, name: user.name, photo: user.photo };
                return yield bcryptjs_1.default.compare(password, user.password);
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw new Error('Error fetching user');
        }
    });
}
