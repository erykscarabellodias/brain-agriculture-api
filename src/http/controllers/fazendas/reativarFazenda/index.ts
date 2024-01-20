import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import ReativarFazendaService from "../../../../domain/fazendas/services/reativarFazenda/ReativarFazendaService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import ReativarFazendaController from "./ReativarFazendaController";

const reativarFazenda = (): ReativarFazendaController => {
  const repository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new ReativarFazendaService(repository, validarUuidService);
  const controller = new ReativarFazendaController(service);

  return controller;
};

export default reativarFazenda();
