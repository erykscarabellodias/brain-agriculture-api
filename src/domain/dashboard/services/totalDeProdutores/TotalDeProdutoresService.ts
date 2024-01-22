import ProdutorRepository from "../../../produtores/repositories/ProdutorRepository";

export default class TotalDeProdutoresService {
  constructor(private readonly repository: ProdutorRepository) {}

  async calcular(): Promise<number> {
    return this.repository.totalDeProdutores();
  }
}
