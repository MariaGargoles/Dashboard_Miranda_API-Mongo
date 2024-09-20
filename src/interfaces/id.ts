
export interface Identifiable {
    private _id<T extends Identifiable>(_id: any, item: T, arg2: { new: true; }): unknown;

    id: number;
}