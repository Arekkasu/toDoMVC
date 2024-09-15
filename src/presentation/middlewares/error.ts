import { Request, Response } from "express";

export const error = {
  error404: (req: Request, res: Response) => {
    res.status(404).render("error", {
      title: "Error 404 Not Found",
      message: "El recurso que estás buscando no existe.",
    });
  },
  error505: (req: Request, res: Response, error: any) => {
    res
      .status(500)
      .render("error", { title: "Error Internal Server", message: error });
  },
};
