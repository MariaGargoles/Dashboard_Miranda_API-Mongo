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
exports.ControllersGeneric = ControllersGeneric;
function ControllersGeneric(service) {
    return {
        getAll: (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield service.getAll();
                return res.json({ items });
            }
            catch (e) {
                return next(e);
            }
        }),
        getId: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const item = yield service.getId(id);
                if (item) {
                    return res.json(item);
                }
                else {
                    return res.status(404).json({ message: "Item not found" });
                }
            }
            catch (e) {
                return next(e);
            }
        }),
        post: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = req.body;
                const createdItems = yield service.post(newItem);
                return res.status(201).json(createdItems);
            }
            catch (e) {
                return next(e);
            }
        }),
        deleteID: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updatedItems = yield service.deleteID(id);
                return res.status(204).json(updatedItems);
            }
            catch (e) {
                return next(e);
            }
        }),
        put: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedItem = req.body;
                const updatedItems = yield service.put(updatedItem);
                if (updatedItems) {
                    return res.json(updatedItems);
                }
                else {
                    return res.status(404).json({ message: "Item not found" });
                }
            }
            catch (e) {
                return next(e);
            }
        })
    };
}
