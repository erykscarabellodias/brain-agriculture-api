import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import EditarFazendaService from "../../../../domain/fazendas/services/editarFazenda/EditarFazendaService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import CriarFazendaController from "./EditarFazendaController";

const criarFazenda = (): CriarFazendaController => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();

  const service = new EditarFazendaService(
    fazendaRepository,
    validarUuidService
  );

  const controller = new CriarFazendaController(service);

  return controller;
};

export default criarFazenda();
