import FazendaRepository from "../../../fazendas/repositories/FazendaRepository";

export default class FazendasPorEstadoService {
  constructor(private readonly repository: FazendaRepository) {}

  async calcular() {
    return await this.repository.fazendasPorEstado();
  }
}
