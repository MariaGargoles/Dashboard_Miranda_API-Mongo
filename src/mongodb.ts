import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()

export async function connectDB() {
    mongoose.connection.on('connected', () => {
        console.log('Mongoose successfully connected to the database');
    });

    mongoose.connection.on('error', (error) => {
        console.log('Error connecting Mongoose to the database', error);
    });

    await mongoose.connect(process.env.MONGO_KEY!);
}
