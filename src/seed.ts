import { faker } from '@faker-js/faker';
{/*import mongoose from 'mongoose';
import { connectDB } from './mongodb';
import { Room } from './interfaces/room';*/}
import { RoomService } from './services/room';
//import { User } from './interfaces/user';
import { UserService } from './services/users';
//import { ContactMessage } from './interfaces/messages';
import { ContactMessagesService } from './services/contactmessages';
//import { Booking } from './interfaces/booking';
import { BookingService } from './services/booking';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connection from './sqldb';
dotenv.config();

const NumBookings = 50;
const NumContacts = 15;
const NumRooms = 50;
const NumUsers = 20;

{/*connectDB().catch(error => console.log(error));

const run = async () => {
    await mongoose.connection.dropDatabase();

    // Seeding ContactMessages
    const CreatedContact: ContactMessage[] = [];
    const contactService = new ContactMessagesService();

    for (let i = 0; i < NumContacts; i++) {
        const DataContact: ContactMessage = {
            id: faker.number.int(),
            date: faker.date.past(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            subject: faker.lorem.sentence(),
            comment: faker.lorem.sentence(),
            action: Math.random() < 0.5 ? "publish" : "archived",
        };

        const NewContact = await contactService.add(DataContact);
        CreatedContact.push(NewContact);
    }

    // Seeding Rooms
const CreatedRoom: Room[] = [];
const roomService = new RoomService();
const amenities: string[] = ['Air conditioner', 'High speed WiFi', 'Breakfast', 'Kitchen', 'Cleaning', 'Shower', 'Grocery', 'Shop Near', 'Towels', 'TV', 'Beach views'];

for (let i = 0; i < NumRooms; i++) {
    const DataRoom: Room = {
        _id: new mongoose.Types.ObjectId(), 
        name: `Room ${i + 1}`, 
        photo: faker.image.url(), 
        number: faker.number.int({ min: 1, max: 100 }).toString(), 
        bedType: faker.helpers.arrayElement(['Single', 'Double', 'Queen', 'King']), 
        amenities: faker.helpers.arrayElements(amenities, { min: 1, max: 5 }), 
        rate: faker.number.int({ min: 10, max: 500 }), 
        offerPrice: faker.number.int({ min: 5, max: 400 }), 
        status: Math.random() < 0.5 ? 'Available' : 'Booked', 
        roomFloor: faker.number.int({ min: 1, max: 5 }).toString(),
        id: 0
    };

    const NewRoom = await roomService.add(DataRoom);
    CreatedRoom.push(NewRoom);
}

    // Seeding Users
    const CreatedUser: User[] = [];
    const userService = new UserService();

    for (let i = 0; i < NumUsers; i++) {
        const password = faker.internet.password();
        const passwordHashed = await bcrypt.hash(password, 10);

        const DataUser: User = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            photo: faker.image.url(),
            startDate: faker.date.past(),
            description: faker.lorem.sentence(),
            contact: faker.phone.number(),
            status: "ACTIVE",
            password: passwordHashed,
            id: 0,
        };

        const NewUser = await userService.add(DataUser);
        CreatedUser.push(NewUser);
    }

    //Personal user
    const myPassword = 'miranda';
    const myHashedPassword = await bcrypt.hash(myPassword, 10);
    const personalUser: User = {
        name: 'Maria Gargoles',
        email: 'segwanda12@gmail.com',
        photo: faker.image.url(),
        description: faker.lorem.sentence(),
        startDate: faker.date.past(),
        status: "ACTIVE",
        password: myHashedPassword,
        contact: faker.phone.number(),
        id: 0
    };

    const MyUser = await userService.add(personalUser);
    CreatedUser.push(MyUser);

    // Seeding Bookings
    const CreatedBooking: Booking[] = [];
    const bookingService = new BookingService();
    
    for (let i = 0; i < NumBookings; i++) {
        const orderDate: Date = faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' });
        const checkInDate: Date = new Date(orderDate);
        checkInDate.setDate(orderDate.getDate() + faker.number.int({ min: 1, max: 10 }));
        const checkOutDate: Date = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + faker.number.int({ min: 2, max: 20 }));
        const room: any = CreatedRoom[Math.floor(Math.random() * CreatedRoom.length)];
        const roomId: string = room._id.toString(); 
        const roomType: string = room.bedType; 
        const roomNumber: number = parseInt(room.number); 
    
        const DataBooking: Booking = {
            id: faker.number.int(), 
            roomId: roomId,
            Name: `Booking ${faker.number.int({ min: 0, max: 999 })}`,
            OrderDate: orderDate,
            CheckIn: checkInDate,
            CheckOut: checkOutDate,
            SpecialRequest: faker.lorem.sentence(),
            RoomType: roomType,
            RoomNumber: roomNumber,
            Status: faker.helpers.arrayElement(["In Progress", "Check In", "Check Out"]),
        };
    
        const NewBooking = await bookingService.addBooking(DataBooking); 
        CreatedBooking.push(NewBooking);
}

console.log('Seed data inserted successfully');
await mongoose.connection.close();
};

run().catch(error => console.log(error));
*/}

// Eliminación de datos previos en las tablas
const clearDatabase = async () => {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE Booking');
    await connection.query('TRUNCATE TABLE Users');
    await connection.query('TRUNCATE TABLE Room');
    await connection.query('TRUNCATE TABLE ContactMessages');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
  };
  
  // Seed de ContactMessages
  const seedContacts = async () => {
    const contactService = new ContactMessagesService();
    for (let i = 0; i < NumContacts; i++) {
        const DataContact = {
            id: faker.number.int(),
            date: faker.date.past(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            subject: faker.lorem.sentence(),
            comment: faker.lorem.sentence(),
            action: Math.random() < 0.5 ? ("publish" as "publish") : ("archived" as "archived"),
          };
      await contactService.add(DataContact);
    }
    console.log('ContactMessages seeded successfully');
  };
  
  // Seed de Rooms
  const seedRooms = async () => {
    const roomService = new RoomService();
    const amenities: string[] = ['Air conditioner', 'High speed WiFi', 'Breakfast', 'Kitchen', 'Cleaning', 'Shower', 'Grocery', 'Shop Near', 'Towels', 'TV', 'Beach views'];
  
    for (let i = 0; i < NumRooms; i++) {
        const DataRoom = {
            id: faker.number.int(),
            name: `Room ${i + 1}`,
            photo: faker.image.url(),
            number: faker.number.int({ min: 1, max: 100 }).toString(),
            bedType: faker.helpers.arrayElement(['Single', 'Double', 'Queen', 'King']),
            amenities: faker.helpers.arrayElements(amenities, { min: 1, max: 5 }),
            rate: faker.number.int({ min: 10, max: 500 }),
            offerPrice: faker.number.int({ min: 5, max: 400 }),
            status: Math.random() < 0.5 ? ("Available" as "Available") : ("Booked" as "Booked"), 
            roomFloor: faker.number.int({ min: 1, max: 5 }).toString(),
          };
      await roomService.add(DataRoom);
    }
    console.log('Rooms seeded successfully');
  };
  
  // Seed de Usuarios
  const seedUsers = async () => {
    const userService = new UserService();
  
    for (let i = 0; i < NumUsers; i++) {
      const password = faker.internet.password();
      const passwordHashed = await bcrypt.hash(password, 10);
  
      const DataUser = {
        id: faker.number.int(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        photo: faker.image.url(),
        startDate: faker.date.past(),
        description: faker.lorem.sentence(),
        contact: faker.phone.number(),
        status: "ACTIVE" as "ACTIVE", 
        password: passwordHashed,
      };
  
      await userService.add(DataUser);
    }
    console.log('Users seeded successfully');
  };
  
  // Seed de Bookings
  const seedBookings = async () => {
    const bookingService = new BookingService();
    for (let i = 0; i < NumBookings; i++) {
      const orderDate: Date = faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' });
      const checkInDate: Date = new Date(orderDate);
      checkInDate.setDate(orderDate.getDate() + faker.number.int({ min: 1, max: 10 }));
      const checkOutDate: Date = new Date(checkInDate);
      checkOutDate.setDate(checkInDate.getDate() + faker.number.int({ min: 2, max: 20 }));
  
      const DataBooking = {
        id: faker.number.int(), 
        roomId: faker.number.int(), 
        Name: `Booking ${faker.number.int({ min: 0, max: 999 })}`,
        OrderDate: orderDate,
        CheckIn: checkInDate,
        CheckOut: checkOutDate,
        SpecialRequest: faker.lorem.sentence(),
        RoomType: faker.helpers.arrayElement(['Single', 'Double', 'Queen', 'King']),
        RoomNumber: faker.number.int({ min: 1, max: 100 }),
        Status: faker.helpers.arrayElement(["In Progress", "Check In", "Check Out"]),
      };
      
  
      await bookingService.add(DataBooking);
    }
    console.log('Bookings seeded successfully');
  };
  
  // Función principal
  const runSQLSeeder = async () => {
    await clearDatabase();
    await seedContacts();
    await seedRooms();
    await seedUsers();
    await seedBookings();
    await connection.end();
    console.log('SQL seed data inserted successfully');
  };
  
  runSQLSeeder().catch(error => console.log(error));