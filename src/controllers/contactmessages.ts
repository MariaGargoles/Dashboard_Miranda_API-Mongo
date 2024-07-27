import Express from "express";
import { ContactService } from "../services/contactmessages";
import { ControllersGeneric } from "../controllers/generic"; 

const ContactHandler = new ContactService();
export const ContactController = Express.Router();

const { getAll, getId, post, deleteID, put } = ControllersGeneric(ContactHandler);

ContactController.get('/', getAll);
ContactController.get('/:id', getId);
ContactController.post('/', post);
ContactController.delete('/:id', deleteID);
ContactController.put('/:id', put);
