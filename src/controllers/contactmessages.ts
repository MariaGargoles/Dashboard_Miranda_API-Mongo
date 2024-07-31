import Express from "express";
import { ContactMessagesService } from "../services/contactmessages";
import { authTokenMiddleware } from '../middleware/auth';

export const ContactRouter = Express.Router();


ContactRouter.use(authTokenMiddleware);
ContactRouter.get('/', ContactMessagesService.getAll);
ContactRouter.get('/:id', ContactMessagesService.getId);
ContactRouter.post('/', ContactMessagesService.post);
ContactRouter.delete('/:id', ContactMessagesService.deleteID);
ContactRouter.put('/:id', ContactMessagesService.put);
