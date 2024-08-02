import mongoose from 'mongoose';
import dotenv from "dotenv";


dotenv.config()

export async function connectDB(){
    mongoose.connection.on('conected', () => {
        console.log('mongoose ​​successfully connected to database')
    })

    mongoose.connection.on('conected', (error) => {
        console.log('error connecting mongoose ​​to database', error)
    })

    await mongoose.connect(process.env.MONGO_KEY!)
}



