"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../services/users");
const controller_1 = require("../utils/controller");
const auth_1 = require("../middleware/auth");
const express_1 = __importDefault(require("express"));
const UserHandler = new users_1.UserService();
const userRouter = express_1.default.Router();
const { getAll, getId, post, deleteID, update } = (0, controller_1.ControllersGeneric)(UserHandler);
userRouter.use(auth_1.authTokenMiddleware);
userRouter.get('/', getAll);
userRouter.get('/:id', getId);
userRouter.post('/', post);
userRouter.delete('/:id', deleteID);
userRouter.patch('/:id', update);
exports.default = userRouter;
