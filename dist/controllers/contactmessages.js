"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRouter = void 0;
const express_1 = __importDefault(require("express"));
const contactmessages_1 = require("../services/contactmessages");
exports.ContactRouter = express_1.default.Router();
exports.ContactRouter.get('/', contactmessages_1.ContactMessagesService.getAll);
exports.ContactRouter.get('/:id', contactmessages_1.ContactMessagesService.getId);
exports.ContactRouter.post('/', contactmessages_1.ContactMessagesService.post);
exports.ContactRouter.delete('/:id', contactmessages_1.ContactMessagesService.deleteID);
exports.ContactRouter.put('/:id', contactmessages_1.ContactMessagesService.put);
