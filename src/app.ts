import helmet from "helmet";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { envs } from "./config/env.plugin";
import { error } from "./presentation/middlewares/error";
import routesTask from "./presentation/routes/rTask";
import { PrismaClient } from "@prisma/client";
const app = express();
const port = envs.PORT;

(async () => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));

  //ESTABLECIENDO LAS VISTAS
  app.set("views", path.join(__dirname, "presentation/views"));
  app.set("view engine", "pug");
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.json());
  //CODIFICAION DE DATOS ESTEN CORRECTAMENTE
  app.use(express.urlencoded({ extended: false }));

  //definicion de ruta
  app.use(routesTask);
  //LOS ERRORES VAN AL FINAL
  app.use(error.error404);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  const prisma = new PrismaClient();
  const busqueda = await prisma.tasks.findUnique({
    where: {
      id: 8,
    },
  });
  console.log(busqueda);
})();
