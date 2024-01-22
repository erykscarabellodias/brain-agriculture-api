import { Router } from "express";
import totalDeProdutores from "../controllers/dashboard/totalDeProdutores";

const dashboardRoutes = Router();

dashboardRoutes.get(
  "/total-de-produtores",
  totalDeProdutores.totalDeProdutores.bind(totalDeProdutores)
);

export default dashboardRoutes;
