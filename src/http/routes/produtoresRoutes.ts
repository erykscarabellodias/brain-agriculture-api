import { Router } from "express";
import criarProdutor from "../controllers/produtores/criarProdutor";
import criarFazenda from "../controllers/fazendas/criarFazenda";

const produtoresRouter = Router();

produtoresRouter.post("/", criarProdutor.criar.bind(criarProdutor));
produtoresRouter.post(
  "/:idProdutor/fazendas",
  criarFazenda.criar.bind(criarFazenda)
);

export default produtoresRouter;
