import { Router } from "express";
import detalharFazenda from "../controllers/fazendas/detalharFazenda";
import apagarFazenda from "../controllers/fazendas/apagarFazenda";

const fazendasRoutes = Router();

fazendasRoutes.get(
  "/:idFazenda",
  detalharFazenda.detalhar.bind(detalharFazenda)
);

fazendasRoutes.delete("/:idFazenda", apagarFazenda.apagar.bind(apagarFazenda));

export default fazendasRoutes;
