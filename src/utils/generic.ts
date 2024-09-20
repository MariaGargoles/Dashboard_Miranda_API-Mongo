import { NextFunction, Request, Response } from "express";
import { ServicesGeneric } from "../utils/services"

export const ControllersGeneric = (Service: ServicesGeneric<any>) => {
    const getAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Service.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    const getbyId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const data = await Service.getId(id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    const add = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newItem = req.body;
            const createdItem = await Service.add(newItem);
            res.json(createdItem);
        } catch (error) {
            next(error);
        }
    };

    const deleteID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const removedItem = await Service.deleteID(id);
            res.json(removedItem);
        } catch (error) {
            next(error);
        }
    };

    const update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const result = await Service.update({ _id: id, ...updatedData });
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    return {
        getAll,
        getbyId,
        add,
        deleteID,
        update
    };
};
