import FazendasPorEstadoService from "../../../../domain/dashboard/services/fazendasPorEstado/FazendasPorEstadoService";
import FazendaRepository from "../../../../domain/fazendas/repositories/FazendaRepository";
import FazendasPorEstadoController from "./FazendasPorEstadoController";

const fazendasPorEstado = (): FazendasPorEstadoController => {
  const repository = new FazendaRepository();
  const service = new FazendasPorEstadoService(repository);
  const controller = new FazendasPorEstadoController(service);

  return controller;
};

export default fazendasPorEstado();
