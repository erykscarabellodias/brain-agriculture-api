import PercentualDeUsoDeSoloService from "../../../../domain/dashboard/services/percentualDeUsoDeSolo/PercentualDeUsoDeSoloService";
import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import PercentualDeUsoDeSoloController from "./PercentualDeUsoDeSoloController";

const percentualDoUsoDeSolo = (): PercentualDeUsoDeSoloController => {
  const repository = new FazendaRepository();
  const service = new PercentualDeUsoDeSoloService(repository);
  const controller = new PercentualDeUsoDeSoloController(service);

  return controller;
};

export default percentualDoUsoDeSolo();
