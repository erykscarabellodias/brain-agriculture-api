import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import ApagarFazendaService from "../../../../domain/fazendas/services/apagarFazenda/ApagarFazendaService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import ApagarFazendaController from "./ApagarFazendaController";

const apagarFazenda = (): ApagarFazendaController => {
  const repository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new ApagarFazendaService(repository, validarUuidService);
  const controller = new ApagarFazendaController(service);

  return controller;
};

export default apagarFazenda();
