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
import bcrypt from 'bcryptjs';

const NumBookings = 50;
const NumContacts = 15;
const NumRooms = 50;
const NumUsers = 20;

connectDB().catch(error => console.log(error));

const run = async () => {
    await mongoose.connection.dropDatabase();

    const CreatedContact: ContactMessage[] = [];
    const contactService = new ContactMessagesService();

    for (let i = 0; i < NumContacts; i++) {
        const DataContact: ContactMessage & { id: number } = {
            id: faker.number.int(),
            date: faker.date.past(),
            client: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                image: faker.image.url(),
            },
            subject: faker.lorem.sentence(),
            comment: faker.lorem.sentence(),
            archived: Math.random() < 0.5 ? "true" : "false",
        };
        
        const NewContact = await contactService.add(DataContact);
        CreatedContact.push(NewContact);
    }

    const CreatedRoom: Room[] = [];
    const roomService = new RoomService();
    const amenities: string[] = ['Air conditioner', 'High speed WiFi', 'Breakfast', 'Kitchen', 'Cleaning', 'Shower', 'Grocery', 'Shop Near', 'Towels', 'TV', 'Beach views'];

    for (let i = 0; i < NumRooms; i++) {
        const photosArray: string[] = [];
        for (let j = 0; j < 4; j++) {
            photosArray.push(faker.image.url());
        }

        const DataRoom: Room & { id: number } = {
            id: faker.number.int(),
            roomNumber: faker.number.int({ min: 1, max: 100 }),
            availability: Math.random() < 0.5 ? 'available' : 'booked',
            roomType: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            offer: Math.random() < 0.5,
            price: faker.number.int({ min: 10, max: 500 }),
            discount: faker.number.int({ min: 0, max: 50 }),
            cancellation: faker.lorem.sentence(),
            amenities: faker.helpers.arrayElements(amenities, { min: 1, max: 5 }),
            photosArray: photosArray,
        };

        const NewRoom = await roomService.add(DataRoom);
        CreatedRoom.push(NewRoom);
    }

    const CreatedUser: User[] = [];
    const userService = new UserService();

    for (let i = 0; i < NumUsers; i++) {
        const password = faker.internet.password();
        const passwordHashed = await bcrypt.hash(password, 10);

        const DataUser: User & { id: number } = {
            id: faker.number.int(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            foto: faker.image.url(),
            startDate: faker.date.past(),
            description: faker.lorem.sentence(),
            contact: faker.phone.number(),
            status: "ACTIVE",
            password: passwordHashed,
        };

        const NewUser = await userService.add(DataUser);
        CreatedUser.push(NewUser);
    }

    const myPassword = 'miranda';
    const myHashedPassword = await bcrypt.hash(myPassword, 10);
    const personalUser: User & { id: number } = {
        id: faker.number.int(),
        name: 'Maria Gargoles',
        email: 'segwanda12@gmail.com',
        foto: faker.image.url(),
        description: faker.lorem.sentence(),
        startDate: faker.date.past(),
        status: "ACTIVE",
        password: myHashedPassword,
        contact: faker.phone.number(),
    };

    const MyUser = await userService.add(personalUser);
    CreatedUser.push(MyUser);

    const CreatedBooking: Booking[] = [];
    const bookingService = new BookingService();

    for (let i = 0; i < NumBookings; i++) {
        const orderDate: Date = faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' });
        const checkInDate: Date = new Date(orderDate);
        checkInDate.setDate(orderDate.getDate() + faker.number.int({ min: 1, max: 10 }));
        const checkOutDate: Date = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + faker.number.int({ min: 2, max: 20 }));
        const roomId: string = (CreatedRoom[Math.floor(Math.random() * CreatedRoom.length)] as unknown as { _id: string })._id;

        const DataBooking: Booking & { id: number } = {
            id: faker.number.int(),
            Name: `Booking ${faker.number.int({ min: 0, max: 999 })}`,
            OrderDate: faker.date.past().toISOString(),
            checkIn: checkInDate.toISOString().split('T')[0],
            checkOut: checkOutDate.toISOString().split('T')[0],
            specialRequest: faker.lorem.sentence(),
            roomId: roomId,
            status: faker.helpers.arrayElement(["In progress", "Check In", "Check Out"]),
        };

        const NewBooking = await bookingService.add(DataBooking);
        CreatedBooking.push(NewBooking);
    }

    console.log('Seed data inserted successfully');
    await mongoose.connection.close();
};

run().catch(error => console.log(error));
