import { Router } from 'express';
import { ContactMessagesService } from '../services/contactmessages';
import { ControllersGeneric } from '../utils/controller';


const contactRouter = Router();
const contactMessagesService = new ContactMessagesService();  
const { getAll, getId, post, deleteID, update } = ControllersGeneric(contactMessagesService); 



contactRouter.get('/', getAll);  
contactRouter.get('/:id', getId);  
contactRouter.post('/', post);  
contactRouter.delete('/:id', deleteID);  
contactRouter.patch('/:id', update);  

export default contactRouter;
