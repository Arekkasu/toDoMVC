import { Request, Response } from "express";

const error404 = (req: Request, res: Response) => {
  res.status(404).render("error", {
    title: "Error 404 Not Found",
    message: "El recurso que estás buscando no existe.",
  });
};

export const errorsController = { error404 };
