
export class ServicesGeneric<T> {
    protected model: any;

    constructor(model: any) {
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async getId(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async add(item: T): Promise<T> {
        return this.model.create(item);
    }

    async deleteID(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async update(item: T): Promise<T | null> {
        const { _id, ...rest } = item as any;
        return this.model.findByIdAndUpdate(_id, rest, { new: true }).exec();
    }
}
