import { ServicesGeneric } from "../utils/services";
import { UserModel } from "../models/user";
import { User } from "../interfaces/user";
import bcrypt from 'bcryptjs';
import { ErrorApi } from "../utils/error";

export class UserService extends ServicesGeneric<User> {
    constructor() {
        super(UserModel);
    }

    async addUser(user: User): Promise<User> {
        try {
            
            const existingUser = await this.model.findOne({ email: user.email }).exec();
            if (existingUser) {
                throw ErrorApi.fromMessage('User already exists').withStatus(400);
            }

            
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            const userWithHashedPassword = {
                ...user,
                password: hashedPassword
            };

            
            const newUser = await this.model.create(userWithHashedPassword);
            return newUser;
        } catch (error) {
            if (error instanceof ErrorApi) {
                throw error;
            }
            throw ErrorApi.fromMessage('Failed to add user').withStatus(500);
        }
    }
}
