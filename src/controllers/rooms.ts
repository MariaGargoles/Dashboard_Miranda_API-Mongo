import { RoomService } from '../services/room';
import { ControllersGeneric } from '../utils/controller';
import Express from "express";

const roomHandler = new RoomService();

const roomRouter = Express.Router();
const { getAll, getId, post, deleteID, update } = ControllersGeneric(roomHandler);

roomRouter.get('/', getAll);
roomRouter.get('/:id', getId);
roomRouter.post('/', post);
roomRouter.delete('/:id', deleteID);
roomRouter.patch('/:id', update);

export default roomRouter;
