import { Request, Response } from "express";

let tasks = [
  { id: 1, title: "tarea 1", completed: false },

  { id: 2, title: "tarea 2", completed: true },
];

const getAllTask = (req: Request, res: Response) => {
  res.render("index", { title: "Lista de tareas", tasks: tasks });
};
const getAddTaskForm = (req: Request, res: Response) => {
  res.render("add", { title: "Agregar Tarea" });
};
const addTasks = (req: Request, res: Response) => {
  let { title } = req.body;
  console.log(req.body);
  let id = tasks.length + 1;
  tasks.push({ id, title, completed: false });
  res.redirect("/");
};
const getEditTaksForm = (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  typeof tasks[id] === "undefined"
    ? res.redirect("/")
    : res.render("edit", { title: "editar", task: tasks[id - 1] });
};
const updateTask = (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res.redirect("/");
  } else {
    tasks[taskIndex].title = req.body.title;
    res.redirect("/");
  }
};
const completeTask = (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    res.redirect("/");
  } else {
    tasks[taskIndex].completed = true;
    res.redirect("/");
  }
};
const uncompletedTask = (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    res.redirect("/");
  } else {
    tasks[taskIndex].completed = false;
    res.redirect("/");
  }
};
const deleteTask = (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  tasks = tasks.filter((task) => {
    //IMPORTANTE RESALTAR EL RETURN
    return task.id !== id;
  });
  res.redirect("/");
};

export const taskController = {
  getAllTask,
  getAddTaskForm,
  addTasks,
  getEditTaksForm,
  updateTask,
  completeTask,
  uncompletedTask,
  deleteTask,
};
