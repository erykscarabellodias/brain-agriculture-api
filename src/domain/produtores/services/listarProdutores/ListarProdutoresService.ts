import ProdutorRepository from "../../repositories/ProdutorRepository";

export default class ListarProdutoresService {
  private repository: ProdutorRepository;

  constructor(produtorRepository: ProdutorRepository) {
    this.repository = produtorRepository;
  }

  async listar(desativadas: boolean) {
    const produtores = await this.repository.listar(desativadas);

    return produtores;
  }
}
