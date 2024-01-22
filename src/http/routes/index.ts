import { Router } from "express";
import produtoresRoutes from "./produtoresRoutes";
import fazendasRoutes from "./fazendasRoutes";
import dashboardRoutes from "./dashboardRoutes";

const routes = Router();

routes.use("/produtores", produtoresRoutes);
routes.use("/fazendas", fazendasRoutes);
routes.use("/dashboard", dashboardRoutes);

export { routes };
