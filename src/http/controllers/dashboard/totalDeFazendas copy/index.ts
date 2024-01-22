import TotalDeFazendasService from "../../../../domain/dashboard/services/totalDeFazendas/TotalDeFazendasService";
import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import TotalDeFazendasController from "../totalDeFazendas/TotalDeFazendasController";

const totalDeFazendas = (): TotalDeFazendasController => {
  const repository = new FazendaRepository();
  const service = new TotalDeFazendasService(repository);
  const controller = new TotalDeFazendasController(service);

  return controller;
};

export default totalDeFazendas();
