import { Request, Response } from "express";

let tasks = [{ id: 1, title: "d", completed: false }];

const taskController = {
  getAll: (req: Request, res: Response) => {
    res.render("index", { title: "Lista de tareas", tasks });
  },
  getAddForm: (req: Request, res: Response) => {
    res.render("add", { title: "Agregar Tarea" });
  },
  add: (req: Request, res: Response) => {
    let { title } = req.body;
    console.log(req.body);
    let id = tasks.length + 1;
    tasks.push({ id, title, completed: false });
    res.redirect("/");
  },
  getEditForm: (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    typeof tasks[id] === "undefined"
      ? res.redirect("/")
      : res.render("edit", { title: "editar", task: tasks[id - 1] });
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
