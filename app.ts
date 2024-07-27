import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { BookingController } from './src/controllers/booking';
import { ContactController } from './src/controllers/contactmessages';


export const App = () => {
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/rooms', roomRoutes);
app.use('/users', userRoutes);
app.use('/booking', BookingController);
app.use('/contact', ContactController);

}