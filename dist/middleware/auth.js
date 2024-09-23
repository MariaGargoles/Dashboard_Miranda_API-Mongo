"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenMiddleware = authTokenMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
function authTokenMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        next(error_1.ErrorApi);
    }
}
