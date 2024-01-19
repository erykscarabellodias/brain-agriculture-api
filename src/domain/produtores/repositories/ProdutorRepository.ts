import { Repository } from "typeorm";
import { appDataSource } from "../../../config/database/typeorm/data-source";
import { v4 as uuid } from "uuid";
import { Produtor } from "../entities/Produtor";

export default class ProdutorRepository {
  private repository: Repository<Produtor>;

  constructor() {
    this.repository = appDataSource.getRepository(Produtor);
  }

  async criar(nomeProdutor: string, cpf: string, cnpj: string) {
    return this.repository.save({
      id: uuid(),
      nomeProdutor,
      cpf,
      cnpj,
      ativo: true,
    });
  }

  async buscarPorCpf(cpf: string): Promise<Produtor | null> {
    return this.repository.findOneBy({ cpf });
  }

  async buscarPorCnpj(cnpj: string): Promise<Produtor | null> {
    return this.repository.findOneBy({ cnpj });
  }
}
