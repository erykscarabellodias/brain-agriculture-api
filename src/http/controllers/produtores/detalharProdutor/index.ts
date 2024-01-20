import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import DetalharProdutorService from "../../../../domain/produtores/services/detalharProdutor/DetalharProdutorService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import DetalharProdutorController from "./DetalharProdutorController";

const detalharProdutor = (): DetalharProdutorController => {
  const repository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new DetalharProdutorService(repository, validarUuidService);
  const controller = new DetalharProdutorController(service);

  return controller;
};

export default detalharProdutor();
