import fs from 'fs';
import path from 'path';
import { connectDB } from "../mongodb"; 
import { RoomModel } from "../models/room";
import { UserModel }from "../models/user";  
import { BookingModel } from "../models/booking";  
import { MessageModel }from "../models/messages";  

const importData = async () => {
    try {
        await connectDB();

        const roomsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rooms.json'), 'utf-8'));
        const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
        const bookingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'booking.json'), 'utf-8'));
        const messagesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'ContactMessages.json'), 'utf-8'));


        await RoomModel.insertMany(roomsData);
        await UserModel.insertMany(usersData);
        await BookingModel.insertMany(bookingData);
        await MessageModel.insertMany(messagesData);


        console.log('Datos importados correctamente');
        process.exit();
    } catch (error) {
        console.error('Error al importar datos', error);
        process.exit(1);
    }
};

importData();
