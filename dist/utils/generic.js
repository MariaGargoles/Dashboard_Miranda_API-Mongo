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
exports.ControllersGeneric = void 0;
const ControllersGeneric = (Service) => {
    const getAll = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield Service.getAll();
            res.json(data);
        }
        catch (error) {
            next(error);
        }
    });
    const getbyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = yield Service.getId(id);
            res.json(data);
        }
        catch (error) {
            next(error);
        }
    });
    const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newItem = req.body;
            const createdItem = yield Service.add(newItem);
            res.json(createdItem);
        }
        catch (error) {
            next(error);
        }
    });
    const deleteID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const removedItem = yield Service.deleteID(id);
            res.json(removedItem);
        }
        catch (error) {
            next(error);
        }
    });
    const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const result = yield Service.update(Object.assign({ _id: id }, updatedData));
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    });
    return {
        getAll,
        getbyId,
        add,
        deleteID,
        update
    };
};
exports.ControllersGeneric = ControllersGeneric;
