import { Router } from "express";
import detalharFazenda from "../controllers/fazendas/detalharFazenda";
import apagarFazenda from "../controllers/fazendas/apagarFazenda";
import reativarFazenda from "../controllers/fazendas/reativarFazenda";
import editarFazenda from "../controllers/fazendas/editarFazenda";
import vincularCultura from "../controllers/fazendas/vincularCultura";
import desvincularCultura from "../controllers/fazendas/desvincularCultura";

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

fazendasRoutes.put("/:idFazenda", editarFazenda.editar.bind(editarFazenda));

fazendasRoutes.post(
  "/:idFazenda/cultura",
  vincularCultura.vincularCultura.bind(vincularCultura)
);

fazendasRoutes.delete(
  "/:idFazenda/cultura/:idCultura",
  desvincularCultura.desvincularCultura.bind(desvincularCultura)
);

export default fazendasRoutes;
