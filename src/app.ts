import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { loginController } from './controllers/auth';
import roomRouter from './controllers/rooms';  
import userRouter from './controllers/users';
import bookingRouter from './controllers/booking';
import { ContactRouter } from './controllers/contactmessages'; 
import { connectDB } from './mongodb';



connectDB();

const app: Application = express();
app.use(bodyParser.json());

app.post('/login', loginController);

app.use('/rooms', roomRouter);
app.use('/users', userRouter);
app.use('/booking', bookingRouter);
app.use('/contact', ContactRouter);

export { app as App };
