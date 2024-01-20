import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import DetalharFazendaService from "../../../../domain/fazendas/services/detalharFazenda/DetalharFazendaService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import DetalharFazendaController from "./DetalharFazendaController";

const detalharFazenda = (): DetalharFazendaController => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new DetalharFazendaService(
    fazendaRepository,
    validarUuidService
  );
  const controller = new DetalharFazendaController(service);

  return controller;
};

export default detalharFazenda();
