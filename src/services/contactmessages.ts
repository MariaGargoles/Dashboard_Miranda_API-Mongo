import { ContactMessage } from '../interfaces/messages';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

export class ContactMessagesService {
    private static contactMessages: ContactMessage[];

    static {
        const filePath = path.join(__dirname, '../data/contactMessages.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        this.contactMessages = JSON.parse(jsonData);
    }

    static getAll(req: Request, res: Response): void {
        res.json(this.contactMessages);
    }

    static getId(req: Request, res: Response): void {
        const numericId = parseInt(req.params.id, 10);
        const message = this.contactMessages.find(message => message.id === numericId) || null;
        if (message) {
            res.json(message);
        } else {
            res.status(404).send('Not Found');
        }
    }

    static post(req: Request, res: Response): void {
        const item: ContactMessage = req.body;
        this.contactMessages.push(item);
        this.saveToFile();
        res.status(201).json(this.contactMessages);
    }

    static deleteID(req: Request, res: Response): void {
        const numericId = parseInt(req.params.id, 10);
        this.contactMessages = this.contactMessages.filter(message => message.id !== numericId);
        this.saveToFile();
        res.json(this.contactMessages);
    }

    static put(req: Request, res: Response): void {
        const update: ContactMessage = req.body;
        const index = this.contactMessages.findIndex(message => message.id === update.id);
        if (index !== -1) {
            this.contactMessages[index] = update;
            this.saveToFile();
            res.json(this.contactMessages);
        } else {
            res.status(404).send('Not Found');
        }
    }

    private static saveToFile(): void {
        const filePath = path.join(__dirname, '../data/contactMessages.json');
        fs.writeFileSync(filePath, JSON.stringify(this.contactMessages, null, 2), 'utf-8');
    }
}
