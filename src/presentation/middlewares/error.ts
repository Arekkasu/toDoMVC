import { Request, Response } from "express";

export const error = {
  error401: (req: Request, res: Response, err: any) => {
    res.status(401).render("error", {
      title: "Error 401 Authorization Required",
      message: err.message,
    });
  },
  error403: (req: Request, res: Response, err: any) => {
    res.status(403).render("error", {
      title: "Error 403 Forbidden",
      message: err.message,
    });
  },
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
