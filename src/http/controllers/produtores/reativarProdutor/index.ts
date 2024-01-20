import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import ReativarProdutorService from "../../../../domain/produtores/services/reativarProdutor/ReativarProdutorService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import ReativarProdutorController from "./ReativarProdutorController";

const reativarProdutor = (): ReativarProdutorController => {
  const repository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new ReativarProdutorService(repository, validarUuidService);
  const controller = new ReativarProdutorController(service);

  return controller;
};

export default reativarProdutor();
