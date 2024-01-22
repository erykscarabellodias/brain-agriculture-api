import FazendaRepository from "../../../fazendas/repositories/FazendaRepository";

export default class AreaTotalDeFazendasService {
  constructor(private readonly repository: FazendaRepository) {}

  async calcular(): Promise<number> {
    const { soma } = await this.repository.areaTotalDeFazendas();

    return parseInt(soma);
  }
}
