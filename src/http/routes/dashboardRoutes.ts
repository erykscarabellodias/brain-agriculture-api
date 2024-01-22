import { Router } from "express";
import totalDeProdutores from "../controllers/dashboard/totalDeProdutores";
import totalDeFazendas from "../controllers/dashboard/totalDeFazendas";

const dashboardRoutes = Router();

dashboardRoutes.get(
  "/total-de-produtores",
  totalDeProdutores.totalDeProdutores.bind(totalDeProdutores)
);

dashboardRoutes.get(
  "/total-de-fazendas",
  totalDeFazendas.totalDeFazendas.bind(totalDeFazendas)
);

export default dashboardRoutes;
