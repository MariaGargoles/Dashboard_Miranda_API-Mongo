import { Router } from 'express';
import { RoomService } from '../services/room';
import { ControllersGeneric } from '../utils/controller';
import { Room } from '../interfaces/room';

const roomRouter = Router();

const { getAll, getId, post, deleteID, put } = ControllersGeneric<Room>(RoomService);

roomRouter.get('/', getAll);
roomRouter.get('/:id', getId);
roomRouter.post('/', post);
roomRouter.delete('/:id', deleteID);
roomRouter.patch('/:id', put);

export default roomRouter;
