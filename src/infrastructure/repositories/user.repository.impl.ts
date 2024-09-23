import { UserDatasource } from "../../domain/datasources/user.datasource";
import { User } from "../../domain/entities/user.entity";
import { UserRespository } from "../../domain/repository/user.respository";

export class UserRepositoryImpl implements UserRespository {
  constructor(private readonly userDatasource: UserDatasource) {}
  createUser(username: string, password: string): Promise<void> {
    return this.userDatasource.createUser(username, password);
  }
  getUser(username: string): Promise<User | null> {
    return this.userDatasource.getUser(username);
  }
}
