import { Router } from "express";
import detalharFazenda from "../controllers/fazendas/detalharFazenda";

const fazendasRoutes = Router();

fazendasRoutes.get(
  "/:idFazenda",
  detalharFazenda.detalhar.bind(detalharFazenda)
);

export default fazendasRoutes;
