import { Request, Response, NextFunction } from "express";
import { ServiceController } from "../interfaces/service";
import { Identifiable } from "../interfaces/id";

export function ControllersGeneric<T extends Identifiable>(service: ServiceController<T>) {
    return {
        getAll: async (_req: Request, res: Response, next: NextFunction) => {
            try {
                const items = await service.getAll();
                return res.json({ items });
            } catch (e) {
                return next(e);
            }
        },
        getId: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params.id;
                const item = await service.getId(id);
                if (item) {
                    return res.json(item);
                } else {
                    return res.status(404).json({ message: "Item not found" });
                }
            } catch (e) {
                return next(e);
            }
        },
        post: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const newItem = req.body;
                const createdItems = await service.post(newItem);
                return res.status(201).json(createdItems);
            } catch (e) {
                return next(e);
            }
        },
        deleteID: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params.id;
                const updatedItems = await service.deleteID(id);
                return res.status(204).json(updatedItems);
            } catch (e) {
                return next(e);
            }
        },
        put: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const updatedItem = req.body;
                const updatedItems = await service.put(updatedItem);
                if (updatedItems) {
                    return res.json(updatedItems);
                } else {
                    return res.status(404).json({ message: "Item not found" });
                }
            } catch (e) {
                return next(e);
            }
        }
    };
}
