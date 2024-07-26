import { Router, Request, Response, NextFunction } from "express";
import { allBookings, bookingById } from "../services/bookingServices";
import { BookingService } from "../services/booking";



export default BookinRouter = () =< {
const router = Router();
router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    const bookings = allBookings();
    return res.json({ bookings });
});

router.post("/", (_req: Request, _res: Response, _next: NextFunction) => {
  
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const booking = bookingById(id);

        return res.json(booking);
    } catch (e) {
        next(e);
        return;
    }
});

router.patch("/:id", (_req: Request, _res: Response, _next: NextFunction) => {
   
});

router.delete("/:id", (_req: Request, _res: Response, _next: NextFunction) => {})


}