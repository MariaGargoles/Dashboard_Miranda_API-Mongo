"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("./mongodb");
const room_1 = require("./services/room");
const users_1 = require("./services/users");
const contactmessages_1 = require("./services/contactmessages");
const booking_1 = require("./services/booking");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const NumBookings = 50;
const NumContacts = 15;
const NumRooms = 50;
const NumUsers = 20;
(0, mongodb_1.connectDB)().catch(error => console.log(error));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    // Seeding ContactMessages
    const CreatedContact = [];
    const contactService = new contactmessages_1.ContactMessagesService();
    for (let i = 0; i < NumContacts; i++) {
        const DataContact = {
            id: faker_1.faker.number.int(),
            date: faker_1.faker.date.past(),
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            subject: faker_1.faker.lorem.sentence(),
            comment: faker_1.faker.lorem.sentence(),
            action: Math.random() < 0.5 ? "publish" : "archived",
        };
        const NewContact = yield contactService.add(DataContact);
        CreatedContact.push(NewContact);
    }
    // Seeding Rooms
    const CreatedRoom = [];
    const roomService = new room_1.RoomService();
    const amenities = ['Air conditioner', 'High speed WiFi', 'Breakfast', 'Kitchen', 'Cleaning', 'Shower', 'Grocery', 'Shop Near', 'Towels', 'TV', 'Beach views'];
    for (let i = 0; i < NumRooms; i++) {
        const DataRoom = {
            _id: new mongoose_1.default.Types.ObjectId(),
            name: `Room ${i + 1}`,
            photo: faker_1.faker.image.url(),
            number: faker_1.faker.number.int({ min: 1, max: 100 }).toString(),
            bedType: faker_1.faker.helpers.arrayElement(['Single', 'Double', 'Queen', 'King']),
            amenities: faker_1.faker.helpers.arrayElements(amenities, { min: 1, max: 5 }),
            rate: faker_1.faker.number.int({ min: 10, max: 500 }),
            offerPrice: faker_1.faker.number.int({ min: 5, max: 400 }),
            status: Math.random() < 0.5 ? 'Available' : 'Booked',
            roomFloor: faker_1.faker.number.int({ min: 1, max: 5 }).toString(),
            id: 0
        };
        const NewRoom = yield roomService.add(DataRoom);
        CreatedRoom.push(NewRoom);
    }
    // Seeding Users
    const CreatedUser = [];
    const userService = new users_1.UserService();
    for (let i = 0; i < NumUsers; i++) {
        const password = faker_1.faker.internet.password();
        const passwordHashed = yield bcryptjs_1.default.hash(password, 10);
        const DataUser = {
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            foto: faker_1.faker.image.url(),
            startDate: faker_1.faker.date.past(),
            description: faker_1.faker.lorem.sentence(),
            contact: faker_1.faker.phone.number(),
            status: "ACTIVE",
            password: passwordHashed,
            id: 0
        };
        const NewUser = yield userService.add(DataUser);
        CreatedUser.push(NewUser);
    }
    const myPassword = 'miranda';
    const myHashedPassword = yield bcryptjs_1.default.hash(myPassword, 10);
    const personalUser = {
        name: 'Maria Gargoles',
        email: 'segwanda12@gmail.com',
        foto: faker_1.faker.image.url(),
        description: faker_1.faker.lorem.sentence(),
        startDate: faker_1.faker.date.past(),
        status: "ACTIVE",
        password: myHashedPassword,
        contact: faker_1.faker.phone.number(),
        id: 0
    };
    const MyUser = yield userService.add(personalUser);
    CreatedUser.push(MyUser);
    // Seeding Bookings
    const CreatedBooking = [];
    const bookingService = new booking_1.BookingService();
    for (let i = 0; i < NumBookings; i++) {
        const orderDate = faker_1.faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' });
        const checkInDate = new Date(orderDate);
        checkInDate.setDate(orderDate.getDate() + faker_1.faker.number.int({ min: 1, max: 10 }));
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + faker_1.faker.number.int({ min: 2, max: 20 }));
        const room = CreatedRoom[Math.floor(Math.random() * CreatedRoom.length)];
        const roomId = room._id.toString();
        const roomType = room.bedType;
        const roomNumber = parseInt(room.number);
        const DataBooking = {
            id: faker_1.faker.number.int(),
            roomId: roomId,
            Name: `Booking ${faker_1.faker.number.int({ min: 0, max: 999 })}`,
            OrderDate: orderDate,
            CheckIn: checkInDate,
            CheckOut: checkOutDate,
            SpecialRequest: faker_1.faker.lorem.sentence(),
            RoomType: roomType,
            RoomNumber: roomNumber,
            Status: faker_1.faker.helpers.arrayElement(["In Progress", "Check In", "Check Out"]),
        };
        const NewBooking = yield bookingService.addBooking(DataBooking);
        CreatedBooking.push(NewBooking);
    }
    console.log('Seed data inserted successfully');
    yield mongoose_1.default.connection.close();
});
run().catch(error => console.log(error));
