import TotalDeProdutoresService from "../../../../domain/dashboard/services/totalDeProdutores/TotalDeProdutoresService";
import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import TotalDeProdutoresController from "./TotalDeProdutoresController";

const totalDeProdutores = (): TotalDeProdutoresController => {
  const repository = new ProdutorRepository();
  const service = new TotalDeProdutoresService(repository);
  const controller = new TotalDeProdutoresController(service);

  return controller;
};

export default totalDeProdutores();
