import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { connectDB } from './mongodb';
import { Room } from './interfaces/room';
import { RoomService } from './services/room';
import { User } from './interfaces/user';
import { UserService } from './services/users';
import { ContactMessage } from './interfaces/messages';
import { ContactMessagesService } from './services/contactmessages';
import { Booking } from './interfaces/booking';
import { BookingService } from './services/booking';
import bcrypt from 'bcrypt';

const NUM_BOOKINGS = 30;
const NUM_CONTACTS = 10;
const NUM_ROOMS = 20;
const NUM_USERS = 25;

connectDB().catch(error => console.log(error));

const run = async () => {
    await mongoose.connection.dropDatabase();

   //ContactMessages
    const createdContacts: ContactMessage[] = [];
    const actionStatuses: ("publish" | "archived")[] = ["publish", "archived"];

    for (let i = 0; i < NUM_CONTACTS; i++) {
        const actionStatus = faker.helpers.arrayElement(actionStatuses);
        const contactData: ContactMessage = {
            id: i + 1, 
            date: faker.date.past(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            subject: faker.lorem.sentence(),
            comment: faker.lorem.sentence(),
            action: actionStatus,
        };

        ContactMessagesService.addContactMessage(contactData); 
        createdContacts.push(contactData);
    }

    //Rooms
    const createdRooms: Room[] = [];
    

    const amenitiesList: string[] = ['Air conditioner', 'High speed WiFi', 'Breakfast', 'Kitchen', 'Cleaning', 'Shower', 'Grocery', 'Shop Near', 'Towels', 'TV', 'Beach views'];

    for (let i = 0; i < NUM_ROOMS; i++) {
        const photosArray: string[] = [];
        for (let j = 0; j < 4; j++) {
            photosArray.push(faker.image.imageUrl());
        }
        const roomData: Room = {
            id: i + 1, 
            photo: faker.image.imageUrl(),
            number: faker.number.int({ min: 1, max: 100 }).toString(),
            bedType: faker.lorem.word(),
            amenities: faker.helpers.arrayElements(amenitiesList, { min: 1, max: 5 }),
            rate: faker.number.int({ min: 10, max: 500 }),
            offerPrice: faker.number.int({ min: 0, max: 50 }),
            status: Math.random() < 0.5 ? 'Available' : 'Booked',
            roomFloor: faker.lorem.word(),
        };

        const newRoom = await RoomService.post(roomData);
        createdRooms.push(newRoom[newRoom.length - 1]);
    }

    //Users
    const createdUsers: User[] = [];
    
    for (let i = 0; i < NUM_USERS; i++) {
        
        const userData: User = {
            id: i + 1,
            name: faker.person.fullName(),
            foto: faker.image.url(),
            email: faker.internet.email(),
            contact: faker.phone.number(),
            description: faker.lorem.sentence(),
            startDate: faker.date.past(),
            status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
            password:  faker.internet.password(),
        };

        const newUser = await UserService.post(userData); 
        createdUsers.push(newUser);
    }

    // Personal User
    const myPassword = 'miranda';
    const myHashedPassword = await bcrypt.hash(myPassword, 10);
    const personalUser: User = {
        id: NUM_USERS + 1,
        name: 'Maria Gargoles',
        email: 'segwanda12@gmail.com',
        foto: faker.image.url(),
        description: faker.lorem.sentence(),
        startDate: faker.date.past(),
        status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
        password: myHashedPassword,
        contact: ''
    };

    const myUser = await UserService.post(personalUser);
    createdUsers.push(myUser); 

    // Booking 
    const createdBookings: Booking[] = [];
    const bookingService = new BookingService();

    for (let i = 0; i < NUM_BOOKINGS; i++) {
        const orderDate: Date = faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' });
        const checkInDate: Date = new Date(orderDate);
        checkInDate.setDate(orderDate.getDate() + faker.number.int({ min: 1, max: 10 }));
        const checkOutDate: Date = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + faker.number.int({ min: 2, max: 20 }));
        

        const bookingData: Booking = {
            id: i + 1,
            Name: `Booking ${faker.number.int({ min: 0, max: 999 })}`,
            OrderDate: faker.date.past(),
            CheckIn: checkInDate,
            CheckOut: checkOutDate,
            SpecialRequest: faker.lorem.sentence(),
            RoomType: faker.lorem.words(2),
            RoomNumber: faker.number.int({ min: 1, max: 100 }),
            Status: faker.helpers.arrayElement(["In Progress", "Check In", "Check Out"]),
            roomId: undefined
        };

        const newBooking = await bookingService.post(bookingData);
        createdBookings.push(newBooking);
    }
    console.log('Datos de prueba insertados correctamente');
};

run().catch(error => console.log(error));