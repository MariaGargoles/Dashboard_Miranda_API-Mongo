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
const ControllersGeneric = (Model) => {
    const getAll = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield Model.getAll();
            res.json({ data });
        }
        catch (error) {
            next(error);
        }
    });
    const getId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = yield Model.getId(id);
            if (data) {
                res.json({ data });
            }
            else {
                res.status(404).json({ message: "Not found" });
            }
        }
        catch (error) {
            next(error);
        }
    });
    const post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const New = req.body;
            const Create = yield Model.post(New);
            res.status(201).json({ data: Create });
        }
        catch (error) {
            next(error);
        }
    });
    const deleteID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const remove = yield Model.deleteID(id);
            res.json({ data: remove });
        }
        catch (error) {
            next(error);
        }
    });
    const put = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const modify = req.body;
            const update = yield Model.put(modify);
            if (update) {
                res.json({ data: update });
            }
            else {
                res.status(404).json({ message: "Not found" });
            }
        }
        catch (error) {
            next(error);
        }
    });
    return {
        getAll,
        getId,
        post,
        deleteID,
        put
    };
};
exports.ControllersGeneric = ControllersGeneric;
