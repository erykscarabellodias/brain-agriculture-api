import { Router } from "express";
import produtoresRoutes from "./produtoresRoutes";
import fazendasRoutes from "./fazendasRoutes";

const routes = Router();

routes.use("/produtores", produtoresRoutes);
routes.use("/fazendas", fazendasRoutes);

export { routes };
