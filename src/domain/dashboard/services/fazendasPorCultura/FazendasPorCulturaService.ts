import CulturaRepository from "../../../fazendas/repositories/CulturaRepository";

export default class FazendasPorCulturaService {
  constructor(private readonly repository: CulturaRepository) {}

  async calcular() {
    return await this.repository.fazendasPorCultura();
  }
}
