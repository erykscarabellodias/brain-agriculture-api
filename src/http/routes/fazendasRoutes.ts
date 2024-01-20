import { Router } from "express";
import detalharFazenda from "../controllers/fazendas/detalharFazenda";
import apagarFazenda from "../controllers/fazendas/apagarFazenda";
import reativarFazenda from "../controllers/fazendas/reativarFazenda";

const fazendasRoutes = Router();

fazendasRoutes.get(
  "/:idFazenda",
  detalharFazenda.detalhar.bind(detalharFazenda)
);

fazendasRoutes.delete("/:idFazenda", apagarFazenda.apagar.bind(apagarFazenda));

fazendasRoutes.patch(
  "/:idFazenda/reativar",
  reativarFazenda.apagar.bind(reativarFazenda)
);

export default fazendasRoutes;
