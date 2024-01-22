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
    });
  }

  async buscarPorCpf(cpf: string): Promise<Produtor | null> {
    return this.repository.findOne({ where: { cpf }, withDeleted: true });
  }

  async buscarPorCnpj(cnpj: string): Promise<Produtor | null> {
    return this.repository.findOne({ where: { cnpj }, withDeleted: true });
  }

  async buscarPorId(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: ["fazendas"],
      withDeleted: true,
    });
  }

  async listar(desativadas: boolean) {
    const queryBuilder = this.repository.createQueryBuilder();

    if (desativadas) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  async apagar(produtor: Produtor): Promise<Produtor> {
    produtor.deletedAt = new Date();
    this.repository.save(produtor);

    return produtor;
  }

  async reativar(produtor: Produtor): Promise<Produtor> {
    produtor.deletedAt = null;
    this.repository.save(produtor);

    return produtor;
  }

  async atualizar(
    produtor: Produtor,
    nomeProdutor: string,
    cpf: string,
    cnpj: string
  ): Promise<Produtor> {
    produtor.nomeProdutor = nomeProdutor;
    produtor.cpf = cpf;
    produtor.cnpj = cnpj;

    return this.repository.save(produtor);
  }

  async buscarOutroProdutorComOMesmoCpf(produtor: Produtor, cpf: string) {
    return this.repository
      .createQueryBuilder()
      .where("id <> :id", { id: produtor.id })
      .andWhere("cpf = :cpf", { cpf })
      .withDeleted()
      .getOne();
  }

  async buscarOutroProdutorComOMesmoCnpj(produtor: Produtor, cnpj: string) {
    return this.repository
      .createQueryBuilder()
      .where("id <> :id", { id: produtor.id })
      .andWhere("cnpj = :cnpj", { cnpj })
      .withDeleted()
      .getOne();
  }

  async totalDeProdutores(): Promise<number> {
    return this.repository.count();
  }
}
