import Express from "express";
import { ContactMessagesService } from "../services/contactmessages";
import { authTokenMiddleware } from '../middleware/auth';

export const ContactController = Express.Router();


ContactController.use(authTokenMiddleware);
ContactController.get('/', ContactMessagesService.getAll);
ContactController.get('/:id', ContactMessagesService.getId);
ContactController.post('/', ContactMessagesService.post);
ContactController.delete('/:id', ContactMessagesService.deleteID);
ContactController.put('/:id', ContactMessagesService.put);
