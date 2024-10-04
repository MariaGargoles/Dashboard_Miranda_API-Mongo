import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { loginController } from './controllers/auth';
import roomRouter from './controllers/rooms';  
import userRouter from './controllers/users';
import bookingRouter from './controllers/booking';
import contactRouter from './controllers/contactmessages'; 
{/*import { connectDB } from './mongodb'/;*/}
import { ErrorApi } from './utils/error';
import { authTokenMiddleware } from './middleware/auth';
import dotenv from 'dotenv';
import connection from './sqldb';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

{/*async function startServer() {
    try {
        await connectDB();
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}*/}

async function startServer() {
    try {
        await connection.getConnection();
        console.log('SQL Database connected successfully');
    } catch (error) {
        console.error('Error connecting to SQL Database:', error);
        process.exit(1);
    }
}

startServer();

app.use(cors({
    origin: 'http://localhost:5173', // Cambiar por el localhost de front
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Manejar las peticiones 
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(204); 
    } else {
        next();
    }
});

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.post('/login', loginController);
app.use('/rooms', authTokenMiddleware, roomRouter);
app.use('/users', authTokenMiddleware, userRouter);
app.use('/booking', authTokenMiddleware, bookingRouter);
app.use('/contact', authTokenMiddleware, contactRouter);

// Manejo de errores
app.use((error: ErrorApi, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    res.status(error.status || 500).json({
        message: error.safe ? error.message : 'Error in the application',
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

export { app };
