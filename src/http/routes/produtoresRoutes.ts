import { Router } from "express";
import criarProdutor from "../controllers/produtores/criarProdutor";
import criarFazenda from "../controllers/fazendas/criarFazenda";
import listarProdutores from "../controllers/produtores/listarProdutores";
import detalharProdutor from "../controllers/produtores/detalharProdutor";
import apagarProdutor from "../controllers/produtores/apagarProdutor";
import reativarProdutor from "../controllers/produtores/reativarProdutor";

const produtoresRouter = Router();

produtoresRouter.post("/", criarProdutor.criar.bind(criarProdutor));

produtoresRouter.post(
  "/:idProdutor/fazendas",
  criarFazenda.criar.bind(criarFazenda)
);

produtoresRouter.get("/", listarProdutores.listar.bind(listarProdutores));

produtoresRouter.get(
  "/:idProdutor",
  detalharProdutor.detalhar.bind(detalharProdutor)
);

produtoresRouter.delete(
  "/:idProdutor",
  apagarProdutor.apagar.bind(apagarProdutor)
);

produtoresRouter.patch(
  "/:idProdutor/reativar",
  reativarProdutor.reativar.bind(reativarProdutor)
);

export default produtoresRouter;
