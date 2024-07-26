import { ServicesGeneric } from "../utils/services";
import { Room } from "../interfaces/room";
import data from "../data/Rooms.json";

export class ContactService extends ServicesGeneric<Room> {
    constructor() {
        super(data);
    }
}
