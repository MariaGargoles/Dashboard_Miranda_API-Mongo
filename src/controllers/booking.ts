import Express from "express";
import { BookingService } from "../services/booking";
import { authTokenMiddleware } from '../middleware/auth';

export const bookingRouter = Express.Router();

bookingRouter.use(authTokenMiddleware);

bookingRouter.get('/', BookingService.getAll);
bookingRouter.get('/:id', BookingService.getId);
bookingRouter.post('/', BookingService.post);
bookingRouter.delete('/:id', BookingService.deleteID);
bookingRouter.patch('/:id', BookingService.put);

export default bookingRouter;
