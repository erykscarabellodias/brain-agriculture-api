import FazendasPorCulturaService from "../../../../domain/dashboard/services/fazendasPorCultura/FazendasPorCulturaService";
import CulturaRepository from "../../../../domain/fazendas/repositories/CulturaRepository";
import FazendasPorCulturaController from "./FazendasPorCulturaController";

const fazendasPorCultura = (): FazendasPorCulturaController => {
  const repository = new CulturaRepository();
  const service = new FazendasPorCulturaService(repository);
  const controller = new FazendasPorCulturaController(service);

  return controller;
};

export default fazendasPorCultura();
