
import { ContactMessage } from '../interfaces/messages';
import { ServiceController } from '../interfaces/service';
import fs from 'fs';
import path from 'path';

export class ContactMessagesService implements ServiceController<ContactMessage> {
    private contactMessages: ContactMessage[];

    constructor() {
        const filePath = path.join(__dirname, '../data/contactMessages.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        this.contactMessages = JSON.parse(jsonData);
    }

    async getAll(): Promise<ContactMessage[]> {
        return this.contactMessages;
    }

    async getId(id: string): Promise<ContactMessage | null> {
        const numericId = parseInt(id, 10);
        return this.contactMessages.find(message => message.id === numericId) || null;
    }

    async post(item: ContactMessage): Promise<ContactMessage[]> {
        this.contactMessages.push(item);
        this.saveToFile();
        return this.contactMessages;
    }

    async deleteID(id: string): Promise<ContactMessage[]> {
        const numericId = parseInt(id, 10);
        this.contactMessages = this.contactMessages.filter(message => message.id !== numericId);
        this.saveToFile();
        return this.contactMessages;
    }

    async put(update: ContactMessage): Promise<ContactMessage[] | null> {
        const index = this.contactMessages.findIndex(message => message.id === update.id);
        if (index !== -1) {
            this.contactMessages[index] = update;
            this.saveToFile();
            return this.contactMessages;
        }
        return null;
    }

    private saveToFile(): void {
        const filePath = path.join(__dirname, '../data/contactMessages.json');
        fs.writeFileSync(filePath, JSON.stringify(this.contactMessages, null, 2), 'utf-8');
    }
}
