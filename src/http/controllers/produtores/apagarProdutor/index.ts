import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import ApagarProdutorService from "../../../../domain/produtores/services/apagarProdutor/ApagarProdutorService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import ApagarProdutorController from "./ApagarProdutorController";

const apagarProdutor = (): ApagarProdutorController => {
  const repository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new ApagarProdutorService(repository, validarUuidService);
  const controller = new ApagarProdutorController(service);

  return controller;
};

export default apagarProdutor();
