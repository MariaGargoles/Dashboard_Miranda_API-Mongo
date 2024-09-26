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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessagesService = void 0;
const messages_1 = require("../models/messages");
const error_1 = require("../utils/error");
const services_1 = require("../utils/services");
class ContactMessagesService extends services_1.ServicesGeneric {
    constructor() {
        super(messages_1.MessageModel);
    }
    addContactMessage(contactMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield this.model.create(contactMessage);
                return newMessage;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to add contact message').withStatus(500);
            }
        });
    }
    updateContactMessage(id, messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMessage = yield this.model.findByIdAndUpdate(id, messageData, { new: true }).exec();
                if (!updatedMessage) {
                    throw error_1.ErrorApi.fromMessage('Contact message not found').withStatus(404);
                }
                return updatedMessage;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to update contact message').withStatus(500);
            }
        });
    }
    deleteContactMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedMessage = yield this.model.findByIdAndDelete(id).exec();
                if (!deletedMessage) {
                    throw error_1.ErrorApi.fromMessage('Contact message not found').withStatus(404);
                }
                return deletedMessage;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to delete contact message').withStatus(500);
            }
        });
    }
    getContactMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.model.findById(id).exec();
                if (!message) {
                    throw error_1.ErrorApi.fromMessage('Contact message not found').withStatus(404);
                }
                return message;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to get contact message').withStatus(500);
            }
        });
    }
    getAllContactMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.model.find().exec();
                return messages;
            }
            catch (error) {
                throw error_1.ErrorApi.fromMessage('Failed to get contact messages').withStatus(500);
            }
        });
    }
}
exports.ContactMessagesService = ContactMessagesService;
