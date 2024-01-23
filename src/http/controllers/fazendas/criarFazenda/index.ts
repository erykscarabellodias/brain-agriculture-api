import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import CriarFazendaService from "../../../../domain/fazendas/services/criarFazenda/CriarFazendaService";
import ProdutorRepository from "../../../../domain/produtores/repositories/ProdutorRepository";
import BuscarCepServiceViaCep from "../../../../shared/services/buscarCep/BuscarCepViaCepService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import CriarFazendaController from "./CriarFazendaController";

const criarFazenda = (): CriarFazendaController => {
  const produtoRepository = new ProdutorRepository();
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const buscarCepService = new BuscarCepServiceViaCep();

  const service = new CriarFazendaService(
    fazendaRepository,
    produtoRepository,
    validarUuidService,
    buscarCepService
  );
  const controller = new CriarFazendaController(service);

  return controller;
};

export default criarFazenda();
