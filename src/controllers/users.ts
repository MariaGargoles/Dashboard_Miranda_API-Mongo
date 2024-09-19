
import { UserService } from '../services/users';
import { ControllersGeneric } from '../utils/controller';
import { User } from '../interfaces/user';
import { authTokenMiddleware } from '../middleware/auth';
import Express from "express";

const userRouter = Express.Router();
const { getAll, getId, post, deleteID, put } = ControllersGeneric<User>(UserService);

userRouter.use(authTokenMiddleware);

userRouter.get('/', getAll);
userRouter.get('/:id', getId);
userRouter.post('/', post);
userRouter.delete('/:id', deleteID);
userRouter.patch('/:id', put);

export default userRouter;
