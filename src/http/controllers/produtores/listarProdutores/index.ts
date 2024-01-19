import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import ListarProdutoresService from "../../../../domain/produtores/services/listarProdutores/ListarProdutoresService";
import ListarProdutoresController from "./ListarProdutoresController";

const listarProdutores = (): ListarProdutoresController => {
  const repository = new ProdutorRepository();
  const service = new ListarProdutoresService(repository);
  const controller = new ListarProdutoresController(service);

  return controller;
};

export default listarProdutores();
