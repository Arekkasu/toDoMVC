import { Request, Response } from "express";
import { error } from "../middlewares/error";
import { TaskRepositoryImpl } from "../../infrastructure/repositories/task.repository.impl";
import { PostgresTaskDatasource } from "../../infrastructure/datasources/psql-task.datasource";
import { TaskEntity } from "../../domain/entities/tasks.entity";

const databaseSystem = new TaskRepositoryImpl(new PostgresTaskDatasource());

let tasks: any[] = [];

const taskController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const tasks: TaskEntity[] = await databaseSystem.getAll();
      res.render("index", { title: "Lista de tareas", tasks });
    } catch (e) {
      error.error505(req, res, e);
    }
  },
  getAddForm: (req: Request, res: Response) => {
    res.render("add", { title: "Agregar Tarea" });
  },
  add: async (req: Request, res: Response) => {
    try {
      let { title } = req.body;
      console.log(title);
      const savetask = await databaseSystem.saveTask({ title });
      res.redirect("/");
    } catch (e) {
      error.error505(req, res, e);
    }
  },
  getEditForm: async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    try {
      let id = parseInt(req.params.id);
      const task = await databaseSystem.getTask(id);
      task === null
        ? res.redirect("/")
        : res.render("edit", { title: "editar", task: task });
    } catch (e) {}
  },
  update: (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      res.redirect("/");
    } else {
      tasks[taskIndex].title = req.body.title;
      res.redirect("/");
    }
  },
  complete: (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      res.redirect("/");
    } else {
      tasks[taskIndex].completed = true;
    }
  },
  uncompleted: (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      res.redirect("/");
    } else {
      tasks[taskIndex].completed = false;
      res.redirect("/");
    }
  },
  delete: (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    tasks = tasks.filter((task) => {
      //IMPORTANTE RESALTAR EL RETURN
      return task.id !== id;
    });
    res.redirect("/");
  },
};

export default taskController;
