import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import CriarFazendaService from "../../../../domain/fazendas/services/criarFazenda/CriarFazendaService";
import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import CriarFazendaController from "./CriarFazendaController";

const criarFazenda = (): CriarFazendaController => {
  const produtoRepository = new ProdutorRepository();
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new CriarFazendaService(
    fazendaRepository,
    produtoRepository,
    validarUuidService
  );
  const controller = new CriarFazendaController(service);

  return controller;
};

export default criarFazenda();
