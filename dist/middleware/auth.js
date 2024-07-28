"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
exports.authTokenMiddleware = authTokenMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
exports.secretKey = process.env.TOKEN_SECRET || 'G7f#4jK@9mL2xP!v';
function authTokenMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, exports.secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new error_1.ErrorApi('Invalid token', 403));
    }
}
