import { Identifiable } from "../interfaces/id";
import { Model } from "mongoose";
import { ErrorApi } from "../utils/error";

export interface ServiceController<T extends Identifiable> {
    getAll(): Promise<T[]>;
    getbyId(id: string): Promise<T | null>;
    add(item: T): Promise<T>;
    deleteID(id: string): Promise<T | null>;
    update(item: T): Promise<T | null>;
}

export class ServicesGeneric<T extends Identifiable> implements ServiceController<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        try {
            return await this.model.find().exec();
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to retrieve items').withStatus(500);
        }
    }

    async getbyId(id: string): Promise<T | null> {
        try {
            const item = await this.model.findById(id).exec();
            if (!item) {
                throw ErrorApi.fromStatus('Item not found', 404);
            }
            return item;
        } catch (error) {
            if (error instanceof ErrorApi) {
                throw error; 
            }
            throw ErrorApi.fromMessage('Failed to retrieve item').withStatus(500);
        }
    }

    async add(item: T): Promise<T> {
        try {
            const newItem = new this.model(item);
            return await newItem.save();
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to add item').withStatus(500);
        }
    }

    async deleteID(id: string): Promise<T | null> {
        try {
            const item = await this.model.findByIdAndDelete(id).exec();
            if (!item) {
                throw ErrorApi.fromStatus('Item not found', 404);
            }
            return item;
        } catch (error) {
            if (error instanceof ErrorApi) {
                throw error; 
            }
            throw ErrorApi.fromMessage('Failed to delete item').withStatus(500);
        }
    }

    async update(item: T): Promise<T | null> {
        try {
            const updatedItem = await this.model.findByIdAndUpdate(item._id, item, { new: true }).exec();
            if (!updatedItem) {
                throw ErrorApi.fromStatus('Item not found', 404);
            }
            return updatedItem;
        } catch (error) {
            if (error instanceof ErrorApi) {
                throw error; 
            }
            throw ErrorApi.fromMessage('Failed to update item').withStatus(500);
        }
    }
}
