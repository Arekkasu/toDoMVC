import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { error } from "../middlewares/error";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { PostgresUserDatasource } from "../../infrastructure/datasources/psql-user.datasource";
import { User } from "../../domain/entities/user.entity";
declare module "express-session" {
  interface SessionData {
    user: any;
  }
}

const databaseSystem = new UserRepositoryImpl(new PostgresUserDatasource());

export const userController = {
  signin: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      await databaseSystem.createUser(username, password);
      res.render("signin", { newUser: true, username });
    } catch (e) {
      console.log(e);
      error.error505(req, res, e);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const result: User | null = await databaseSystem.getUser(username);
      if (result === null) {
        let err = {
          status: 401,
          message: `El usuario ${username} no fue encontrado en la BD`,
        };
        error.error401(req, res, err);
        return;
      }

      let isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
        let err = {
          status: 403,
          message: `Contrasena incorrecta`,
        };
        error.error403(req, res, err);
      }

      // DECALARACION DE INICIO DE SESION
      req.session.user = result;
      res.redirect("/");
    } catch (err) {
      error.error505(req, res, err);
    }
  },
  logout: async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        // manejar error
        console.log(err);
        return res.status(500).send("Hubo un error al cerrar la sesión");
      }

      res.redirect("/login");
    });
  },
  getLoginForm: async (req: Request, res: Response) => {
    res.render("login");
  },
  getSigninForm: async (req: Request, res: Response) => {
    res.render("signin");
  },
};
