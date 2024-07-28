"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.hardcodedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
exports.hardcodedUser = {
    username: 'maria',
    password: 'miranda'
};
const login = (req, res) => {
    const { username, password } = req.body;
    if (username === exports.hardcodedUser.username && password === exports.hardcodedUser.password) {
        const token = jsonwebtoken_1.default.sign({ username: exports.hardcodedUser.username }, auth_1.secretKey, { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};
exports.login = login;
