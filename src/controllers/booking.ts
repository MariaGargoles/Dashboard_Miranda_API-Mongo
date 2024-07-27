import Express from "express";
import { BookingService } from "../services/booking";
import { ControllersGeneric } from "../utils/controller"; 
import { Booking } from "../interfaces/booking";

const bookingHandler = new BookingService();
export const bookingRouter = Express.Router();

const { getAll, getId, post, deleteID, put } = ControllersGeneric<Booking>(bookingHandler);

bookingRouter.get('/', getAll);
bookingRouter.get('/:id', getId);
bookingRouter.post('/', post);
bookingRouter.delete('/:id', deleteID);
bookingRouter.patch('/:id', put);

export default bookingRouter;
