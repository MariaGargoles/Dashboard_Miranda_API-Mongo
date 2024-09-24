import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import mustacheExpress from 'mustache-express';
import { loginController } from './controllers/auth';
import roomRouter from './controllers/rooms';  
import userRouter from './controllers/users';
import bookingRouter from './controllers/booking';
import { ContactRouter } from './controllers/contactmessages'; 
import { connectDB } from './mongodb';
import { ErrorApi } from './utils/error';
import { authTokenMiddleware } from './middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

async function startServer() {
    try {
        await connectDB();
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

startServer();

app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.post('/login', loginController);
app.use('/rooms', authTokenMiddleware, roomRouter);
app.use('/users', authTokenMiddleware, userRouter);
app.use('/booking', authTokenMiddleware, bookingRouter);
app.use('/contact', authTokenMiddleware, ContactRouter);

app.get('/', (_req: Request, res: Response) => {
    res.render('index');
});

app.use((error: ErrorApi, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    res.status(error.status || 500).json({
        message: error.safe ? error.message : 'Error in the application',
    });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

export { app };
