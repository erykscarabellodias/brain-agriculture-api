import AreaTotalDeFazendasService from "../../../../domain/dashboard/services/areaTotalDeFazendas/AreaTotalDeFazendasService";
import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import AreaTotalDeFazendasController from "./AreaTotalDeTotalDeFazendasController";

const areaTotalDeFazendas = (): AreaTotalDeFazendasController => {
  const repository = new FazendaRepository();
  const service = new AreaTotalDeFazendasService(repository);
  const controller = new AreaTotalDeFazendasController(service);

  return controller;
};

export default areaTotalDeFazendas();
