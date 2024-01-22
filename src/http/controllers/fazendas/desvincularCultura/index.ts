import CulturaRepository from "../../../../domain/fazendas/repositories/CulturaRepository";
import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import DesvincularCulturaService from "../../../../domain/fazendas/services/desvincularCultura/DesvincularCulturaService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import DesvincularCulturaController from "./DesvincularCulturaController";

const desvincularCultura = (): DesvincularCulturaController => {
  const fazendaRepository = new FazendaRepository();
  const culturaRepository = new CulturaRepository();
  const validarUuidService = new ValidarUuidService();
  const service = new DesvincularCulturaService(
    fazendaRepository,
    culturaRepository,
    validarUuidService
  );
  const controller = new DesvincularCulturaController(service);

  return controller;
};

export default desvincularCultura();
