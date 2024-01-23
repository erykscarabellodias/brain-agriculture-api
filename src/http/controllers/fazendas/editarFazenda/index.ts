import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import EditarFazendaService from "../../../../domain/fazendas/services/editarFazenda/EditarFazendaService";
import BuscarCepServiceViaCep from "../../../../shared/services/buscarCep/BuscarCepViaCepService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import CriarFazendaController from "./EditarFazendaController";

const criarFazenda = (): CriarFazendaController => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const buscarCepService = new BuscarCepServiceViaCep();

  const service = new EditarFazendaService(
    fazendaRepository,
    validarUuidService,
    buscarCepService
  );

  const controller = new CriarFazendaController(service);

  return controller;
};

export default criarFazenda();
