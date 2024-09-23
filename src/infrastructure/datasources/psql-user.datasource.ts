import { PrismaClient } from "@prisma/client";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { User } from "../../domain/entities/user.entity";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export class PostgresUserDatasource implements UserDatasource {
  async createUser(username: string, password: string): Promise<void> {
    try {
      const hash = await bcrypt.hash(password, 10);
      console.log(hash);
      const result = await prisma.users.create({
        data: { username, password: hash },
      });
      console.log(result);
    } catch (error) {
      throw {
        status: 500,
        message: `Error al registrar ${username}`,
      };
    }
  }
  async getUser(username: string): Promise<User | null> {
    try {
      const user = await prisma.users.findUnique({
        where: {
          username,
        },
      });
      if (user == null) {
        return null;
      }
      return User.fromObject(user);
    } catch (err) {
      throw {
        status: 500,
        message: `Error al obtener el usuario ${username}`,
      };
    }
  }
}
