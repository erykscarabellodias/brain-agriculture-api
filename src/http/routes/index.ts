import { Router } from "express";
import produtoresRoutes from "./produtoresRoutes";

const routes = Router();

routes.use("/produtores", produtoresRoutes);

export { routes };
