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
exports.ServicesGeneric = void 0;
class ServicesGeneric {
    constructor(initial) {
        this.data = initial;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data;
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(id, 10);
            const item = this.data.find(item => item.id === numericId);
            return item || null;
        });
    }
    post(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data.push(item);
            return this.data;
        });
    }
    deleteID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numericId = parseInt(id, 10);
            this.data = this.data.filter(item => item.id !== numericId);
            return this.data;
        });
    }
    put(update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = this.data.map(item => item.id === update.id ? update : item);
            return this.data;
        });
    }
}
exports.ServicesGeneric = ServicesGeneric;
