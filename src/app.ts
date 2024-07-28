import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { login } from './controllers/auth';
import roomRouter from './controllers/rooms';  
import userRouter from './controllers/users';
import bookingRouter from './controllers/booking';
import { ContactController } from './controllers/contactmessages'; 

const app: Application = express();
app.use(bodyParser.json());

app.post('/login', login);

app.use('/rooms', roomRouter);
app.use('/users', userRouter);
app.use('/booking', bookingRouter);
app.use('/contact', ContactController);

export { app as App };
