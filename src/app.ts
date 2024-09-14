import helmet from "helmet";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { taskController } from "./controllers/taskController";
import { envs } from "./config/env.plugin";
import { errorsController } from "./controllers/errorsController";

const app = express();
const port = envs.PORT;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//ESTABLECIENDO LAS VISTAS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
//CODIFICAION DE DATOS ESTEN CORRECTAMENTE
app.use(express.urlencoded({ extended: false }));

app.get("/", taskController.getAllTask);
app.get("/add", taskController.getAddTaskForm);
app.post("/add", taskController.addTasks);

app.get("/edit/:id", taskController.getEditTaksForm);
app.post("/edit/:id", taskController.updateTask);
app.get("/complete/:id", taskController.completeTask);
app.get("/uncomplete/:id", taskController.uncompletedTask);
app.get("/delete/:id", taskController.deleteTask);

//LOS ERRORES VAN AL FINAL
app.use(errorsController.error404);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
