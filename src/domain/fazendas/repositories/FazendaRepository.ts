import { Repository } from "typeorm";
import Fazenda from "../entities/Fazenda";
import { appDataSource } from "../../../config/database/typeorm/data-source";
import { v4 as uuid } from "uuid";
import { Produtor } from "../../produtores/entities/Produtor";

export default class FazendaRepository {
  private repository: Repository<Fazenda>;

  constructor() {
    this.repository = appDataSource.getRepository(Fazenda);
  }

  async criar(
    nomeFazenda: string,
    cidade: string,
    estado: string,
    hectaresAgricultaveis: number,
    hectaresVegetacao: number,
    totalDeHectares: number,
    produtor: Produtor
  ) {
    return this.repository.save({
      id: uuid(),
      nomeFazenda,
      cidade,
      estado,
      hectaresAgricultaveis,
      hectaresVegetacao,
      totalDeHectares,
      ativo: true,
      produtor: produtor,
    });
  }

  async buscarPorProdutorNomeFazendaCidadeEEstado(
    produtor: Produtor,
    nomeFazenda: string,
    cidade: string,
    estado: string
  ) {
    return this.repository.findOne({
      where: {
        produtor: { id: produtor.id },
        nomeFazenda,
        cidade,
        estado,
      },
    });
  }
}
