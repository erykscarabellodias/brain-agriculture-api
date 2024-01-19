import { Router } from "express";
import produtoresRouter from "./produtoresRoutes";

const routes = Router();

routes.use("/produtores", produtoresRouter);

export { routes };
