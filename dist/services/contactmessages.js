"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessagesService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ContactMessagesService {
    static getAll(_req, res) {
        res.json(this.contactMessages);
    }
    static getId(req, res) {
        const numericId = parseInt(req.params.id, 10);
        const message = this.contactMessages.find(message => message.id === numericId) || null;
        if (message) {
            res.json(message);
        }
        else {
            res.status(404).send('Not Found');
        }
    }
    static post(req, res) {
        const item = req.body;
        this.contactMessages.push(item);
        this.saveToFile();
        res.status(201).json(this.contactMessages);
    }
    static deleteID(req, res) {
        const numericId = parseInt(req.params.id, 10);
        this.contactMessages = this.contactMessages.filter(message => message.id !== numericId);
        this.saveToFile();
        res.json(this.contactMessages);
    }
    static put(req, res) {
        const update = req.body;
        const index = this.contactMessages.findIndex(message => message.id === update.id);
        if (index !== -1) {
            this.contactMessages[index] = update;
            this.saveToFile();
            res.json(this.contactMessages);
        }
        else {
            res.status(404).send('Not Found');
        }
    }
    static addContactMessage(contactMessage) {
        this.contactMessages.push(contactMessage);
        this.saveToFile();
    }
    static saveToFile() {
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(this.contactMessages, null, 2), 'utf-8');
    }
}
exports.ContactMessagesService = ContactMessagesService;
_a = ContactMessagesService;
ContactMessagesService.contactMessages = [];
ContactMessagesService.filePath = path_1.default.join(__dirname, '../data/contactMessages.json');
(() => {
    const jsonData = fs_1.default.readFileSync(_a.filePath, 'utf-8');
    _a.contactMessages = JSON.parse(jsonData);
})();
