import { ContactMessage } from '../interfaces/messages';
import { ErrorApi } from "../utils/error";
import { ServicesGeneric } from "../utils/services";
import { MessageModel } from "../models/messages";

export class ContactMessagesService extends ServicesGeneric<ContactMessage> {
    static put(_arg0: string, _put: any) {
        throw new Error("Method not implemented.");
    }
    static deleteID(_arg0: string, _deleteID: any) {
        throw new Error("Method not implemented.");
    }
    static post(_arg0: string, _post: any) {
        throw new Error("Method not implemented.");
    }
    static getId(_arg0: string, _getId: any) {
        throw new Error("Method not implemented.");
    }
    static getAll(_arg0: string, _getAll: any) {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super(MessageModel);
    }

    async addContactMessage(contactMessage: ContactMessage): Promise<ContactMessage> {
        try {
            const newMessage = await this.model.create(contactMessage);
            return newMessage;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to add contact message').withStatus(500);
        }
    }

    async getAllContactMessages(): Promise<ContactMessage[]> {
        try {
            const messages = await this.model.find().exec();
            return messages;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to get contact messages').withStatus(500);
        }
    }

    async getContactMessageById(id: string): Promise<ContactMessage | null> {
        try {
            const message = await this.model.findById(id).exec();
            if (!message) {
                throw ErrorApi.fromMessage('Contact message not found').withStatus(404);
            }
            return message;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to get contact message').withStatus(500);
        }
    }

    async updateContactMessage(id: string, messageData: Partial<ContactMessage>): Promise<ContactMessage | null> {
        try {
            const updatedMessage = await this.model.findByIdAndUpdate(id, messageData, { new: true }).exec();
            if (!updatedMessage) {
                throw ErrorApi.fromMessage('Contact message not found').withStatus(404);
            }
            return updatedMessage;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to update contact message').withStatus(500);
        }
    }

    async deleteContactMessage(id: string): Promise<ContactMessage | null> {
        try {
            const deletedMessage = await this.model.findByIdAndDelete(id).exec();
            if (!deletedMessage) {
                throw ErrorApi.fromMessage('Contact message not found').withStatus(404);
            }
            return deletedMessage;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to delete contact message').withStatus(500);
        }
    }
}
