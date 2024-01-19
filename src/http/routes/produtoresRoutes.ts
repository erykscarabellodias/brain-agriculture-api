import { Router } from "express";
import criarProdutor from "../controllers/produtores/criarProdutor";

const produtoresRouter = Router();

produtoresRouter.post("/", criarProdutor.criar.bind(criarProdutor));

export default produtoresRouter;
