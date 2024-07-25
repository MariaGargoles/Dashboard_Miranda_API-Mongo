import { ServicesGeneric } from "../utils/services";
import data from "../data/Booking.json";
import { Booking } from "../interfaces/booking"

export class BookingService extends ServicesGeneric<Booking> {
    constructor() {
        super(data);
    }
}
