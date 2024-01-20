import { Router } from "express";
import criarProdutor from "../controllers/produtores/criarProdutor";
import criarFazenda from "../controllers/fazendas/criarFazenda";
import listarProdutores from "../controllers/produtores/listarProdutores";
import detalharProdutor from "../controllers/produtores/detalharProdutor";
import apagarProdutor from "../controllers/produtores/apagarProdutor";
import reativarProdutor from "../controllers/produtores/reativarProdutor";
import editarProdutor from "../controllers/produtores/editarProdutor";

const produtoresRoutes = Router();

produtoresRoutes.post("/", criarProdutor.criar.bind(criarProdutor));

produtoresRoutes.post(
  "/:idProdutor/fazendas",
  criarFazenda.criar.bind(criarFazenda)
);

produtoresRoutes.get("/", listarProdutores.listar.bind(listarProdutores));

produtoresRoutes.get(
  "/:idProdutor",
  detalharProdutor.detalhar.bind(detalharProdutor)
);

produtoresRoutes.delete(
  "/:idProdutor",
  apagarProdutor.apagar.bind(apagarProdutor)
);

produtoresRoutes.patch(
  "/:idProdutor/reativar",
  reativarProdutor.reativar.bind(reativarProdutor)
);

produtoresRoutes.put(
  "/:idProdutor",
  editarProdutor.editar.bind(editarProdutor)
);

export default produtoresRoutes;
