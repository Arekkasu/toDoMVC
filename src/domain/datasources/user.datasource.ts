import { User } from "../entities/user.entity";

export abstract class UserDatasource {
  abstract createUser(username: string, password: string): Promise<void>;
  abstract getUser(username: string): Promise<User | null>;
}
