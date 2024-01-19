import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import { CriarProdutorService } from "../../../../domain/produtores/services/criarProdutor/CriarProdutorService";
import ValidarCnpjService from "../../../../shared/services/validarCnpj/ValidarCnpjService";
import ValidarCpfService from "../../../../shared/services/validarCpf/ValidarCpfService";
import CriarProdutorController from "./CriarProdutorController";

const criarProdutor = (): CriarProdutorController => {
  const repository = new ProdutorRepository();
  const validarCpfService = new ValidarCpfService();
  const validarCnpjService = new ValidarCnpjService();
  const service = new CriarProdutorService(
    repository,
    validarCpfService,
    validarCnpjService
  );
  const controller = new CriarProdutorController(service);

  return controller;
};

export default criarProdutor();
