import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import { EditarProdutorService } from "../../../../domain/produtores/services/editarProdutor/EditarProdutorService";
import ValidarCnpjService from "../../../../shared/services/validarCnpj/ValidarCnpjService";
import ValidarCpfService from "../../../../shared/services/validarCpf/ValidarCpfService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import EditarProdutorController from "./EditarProdutorController";

const editarProdutor = (): EditarProdutorController => {
  const produtorRepository = new ProdutorRepository();
  const validarCpfService = new ValidarCpfService();
  const validarCnpjService = new ValidarCnpjService();
  const validarUuidService = new ValidarUuidService();
  const service = new EditarProdutorService(
    produtorRepository,
    validarCpfService,
    validarCnpjService,
    validarUuidService
  );

  const controller = new EditarProdutorController(service);

  return controller;
};

export default editarProdutor();
