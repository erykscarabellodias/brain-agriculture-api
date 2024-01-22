import { Router } from "express";
import totalDeProdutores from "../controllers/dashboard/totalDeProdutores";
import totalDeFazendas from "../controllers/dashboard/totalDeFazendas";
import areaTotalDeFazendas from "../controllers/dashboard/areaTotalDeFazendas";
import fazendasPorEstado from "../controllers/dashboard/fazendasPorEstado";

const dashboardRoutes = Router();

dashboardRoutes.get(
  "/total-de-produtores",
  totalDeProdutores.totalDeProdutores.bind(totalDeProdutores)
);

dashboardRoutes.get(
  "/total-de-fazendas",
  totalDeFazendas.totalDeFazendas.bind(totalDeFazendas)
);

dashboardRoutes.get(
  "/area-total-de-fazendas",
  areaTotalDeFazendas.areaTotalDeFazendas.bind(areaTotalDeFazendas)
);

dashboardRoutes.get(
  "/fazendas-por-estado",
  fazendasPorEstado.fazendasPorEstado.bind(fazendasPorEstado)
);

export default dashboardRoutes;
