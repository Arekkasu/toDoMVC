import { Router } from "express";
import taskController from "../controllers/taskController";

const routesTasks = Router();
routesTasks.get("/add", taskController.getAddForm);
routesTasks.get("/", taskController.getAll);
routesTasks.post("/add", taskController.add);
routesTasks.get("/edit/:id", taskController.getEditForm);
routesTasks.post("/edit/:id", taskController.update);
routesTasks.get("/complete/:id", taskController.complete);
routesTasks.get("/uncomplete/:id", taskController.uncompleted);
routesTasks.get("/delete/:id", taskController.delete);
export default routesTasks;
