import { Router } from 'express';
import { BookingService } from '../services/booking';
import { ControllersGeneric } from '../utils/controller';

const bookingRouter = Router();
const bookingService = new BookingService();  
const { getAll, getId, post, deleteID, update } = ControllersGeneric(bookingService); 

bookingRouter.get('/', getAll);
bookingRouter.get('/:id', getId);
bookingRouter.post('/', post);
bookingRouter.delete('/:id', deleteID);
bookingRouter.patch('/:id', update);

export default bookingRouter;
