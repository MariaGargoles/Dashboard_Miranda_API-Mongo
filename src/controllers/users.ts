import { UserService } from '../services/users';
import { ControllersGeneric } from '../utils/controller';
import { authTokenMiddleware } from '../middleware/auth';
import Express from "express";

const UserHandler = new UserService();

const userRouter = Express.Router();
const { getAll, getId, post, deleteID, update } = ControllersGeneric(UserHandler);

userRouter.use(authTokenMiddleware); 

userRouter.get('/', getAll);
userRouter.get('/:id', getId);
userRouter.post('/', post);
userRouter.delete('/:id', deleteID);
userRouter.patch('/:id', update);

export default userRouter;
