import { NextFunction, Request, Response } from "express";
import { ServicesGeneric } from "./services"; 
import { Identifiable } from "../interfaces/id";

export const ControllersGeneric = <T extends Identifiable>(Model: ServicesGeneric<T>) => {
    const getAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Model.getAll();
            res.json({ data });
        } catch (error) {
            next(error);
        }
    };

    const getId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const data = await Model.getId(id);
            if (data) {
                res.json({ data });
            } else {
                res.status(404).json({ message: "Not found" });
            }
        } catch (error) {
            next(error);
        }
    };

    const post = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const New = req.body;
            const Create = await Model.add(New); 
            res.status(201).json({ data: Create });
        } catch (error) {
            next(error);
        }
    };

    const deleteID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const remove = await Model.deleteID(id);
            res.json({ data: remove });
        } catch (error) {
            next(error);
        }
    };

    const update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const modify = req.body;
            const update = await Model.update(modify); 
            if (update) {
                res.json({ data: update });
            } else {
                res.status(404).json({ message: "Not found" });
            }
        } catch (error) {
            next(error);
        }
    };

    return {
        getAll,
        getId,
        post,
        deleteID,
        update  
    };
};
