import { ServicesGeneric } from "../utils/services";
import data from "../data/ContactMessages.json";
import { ContactMessage } from "../interfaces/messages";

export class ContactService extends ServicesGeneric<ContactMessage> {
    constructor() {
        super(data);
    }
}
