import FazendaRepository from "../../../fazendas/repositories/FazendaRepository";

export default class TotalDeFazendasService {
  constructor(private readonly repository: FazendaRepository) {}

  async calcular(): Promise<number> {
    return await this.repository.totalDeFazendas();
  }
}
