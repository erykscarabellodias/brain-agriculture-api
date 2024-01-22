import CulturaRepository from "../../../../domain/fazendas/repositories/CulturaRepository";
import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import VincularCulturaService from "../../../../domain/fazendas/services/vincularCultura/VincularCulturaService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import VincularCulturaController from "./VincularCulturaController";

const vincularCultura = (): VincularCulturaController => {
  const fazendaRepository = new FazendaRepository();
  const culturaRepository = new CulturaRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new VincularCulturaService(
    fazendaRepository,
    culturaRepository,
    validarUuidService
  );
  const controller = new VincularCulturaController(service);

  return controller;
};

export default vincularCultura();
