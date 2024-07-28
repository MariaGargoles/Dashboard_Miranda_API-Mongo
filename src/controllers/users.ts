import { Router } from 'express';
import { UserService } from "../services/users";
import { ControllersGeneric } from '../utils/controller';
import { User } from '../interfaces/user';

const userRouter = Router();

const { getAll, getId, post, deleteID, put } = ControllersGeneric<User>(UserService);

userRouter.get('/', getAll);
userRouter.get('/:id', getId);
userRouter.post('/', post);
userRouter.delete('/:id', deleteID);
userRouter.patch('/:id', put);

export default userRouter;
