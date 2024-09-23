import Express from "express";
import { ContactMessagesService } from "../services/contactmessages";


export const ContactRouter = Express.Router();



ContactRouter.get('/', ContactMessagesService.getAll);
ContactRouter.get('/:id', ContactMessagesService.getId);
ContactRouter.post('/', ContactMessagesService.post);
ContactRouter.delete('/:id', ContactMessagesService.deleteID);
ContactRouter.put('/:id', ContactMessagesService.put);
