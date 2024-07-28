import Express from "express";
import { ContactMessagesService } from "../services/contactmessages";

export const ContactController = Express.Router();

ContactController.get('/', ContactMessagesService.getAll);
ContactController.get('/:id', ContactMessagesService.getId);
ContactController.post('/', ContactMessagesService.post);
ContactController.delete('/:id', ContactMessagesService.deleteID);
ContactController.put('/:id', ContactMessagesService.put);
