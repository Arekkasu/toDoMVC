import { Router } from "express";
import { userController } from "../controllers/userController";

const routes = Router();

routes.get("/login", userController.getLoginForm);
routes.post("/login", userController.login);
routes.get("/signin", userController.getSigninForm);
routes.post("/signin", userController.signin);
routes.get("/logout", userController.logout);
export default routes;
