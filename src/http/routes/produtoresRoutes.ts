import { Router } from "express";
import criarProdutor from "../controllers/produtores/criarProdutor";
import criarFazenda from "../controllers/fazendas/criarFazenda";
import listarProdutores from "../controllers/produtores/listarProdutores";

const produtoresRouter = Router();

produtoresRouter.post("/", criarProdutor.criar.bind(criarProdutor));
produtoresRouter.post(
  "/:idProdutor/fazendas",
  criarFazenda.criar.bind(criarFazenda)
);
produtoresRouter.get("/", listarProdutores.listar.bind(listarProdutores));

export default produtoresRouter;
