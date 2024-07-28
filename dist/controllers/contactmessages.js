"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const express_1 = __importDefault(require("express"));
const contactmessages_1 = require("../services/contactmessages");
const auth_1 = require("../middleware/auth");
exports.ContactController = express_1.default.Router();
exports.ContactController.use(auth_1.authTokenMiddleware);
exports.ContactController.get('/', contactmessages_1.ContactMessagesService.getAll);
exports.ContactController.get('/:id', contactmessages_1.ContactMessagesService.getId);
exports.ContactController.post('/', contactmessages_1.ContactMessagesService.post);
exports.ContactController.delete('/:id', contactmessages_1.ContactMessagesService.deleteID);
exports.ContactController.put('/:id', contactmessages_1.ContactMessagesService.put);
