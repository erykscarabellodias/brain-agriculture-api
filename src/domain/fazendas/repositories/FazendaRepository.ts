import { Repository } from "typeorm";
import Fazenda from "../entities/Fazenda";
import { appDataSource } from "../../../config/database/typeorm/data-source";
import { v4 as uuid } from "uuid";
import { Produtor } from "../../produtores/entities/Produtor";
import Cultura from "../entities/Cultura";

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

  async buscarPorProdutorNomeFazendaCidadeEEstadoComOutroId(
    fazenda: Fazenda,
    nomeFazenda: string,
    cidade: string,
    estado: string
  ) {
    return this.repository.query(
      `
              SELECT f.*
              FROM fazendas f
              INNER JOIN produtores p ON p.id = f."produtorId"
              WHERE f."nomeFazenda" = $1
              AND f."estado" = $2
              AND f."cidade" = $3
              AND f.id <> $4
              AND p.id = $5
      `,
      [nomeFazenda, estado, cidade, fazenda.id, fazenda.produtor.id]
    );
  }

  async buscarPorId(id: string): Promise<Fazenda | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["produtor", "culturas"],
      withDeleted: true,
    });
  }

  async apagar(fazenda: Fazenda): Promise<Fazenda> {
    fazenda.deletedAt = new Date();
    this.repository.save(fazenda);

    return fazenda;
  }

  async reativar(fazenda: Fazenda): Promise<Fazenda> {
    fazenda.deletedAt = null;
    this.repository.save(fazenda);

    return fazenda;
  }

  async atualizar(
    fazenda: Fazenda,
    nomeFazenda: string,
    cidade: string,
    estado: string,
    hectaresAgricultaveis: number,
    hectaresVegetacao: number,
    totalDeHectares: number
  ) {
    fazenda.nomeFazenda = nomeFazenda;
    fazenda.cidade = cidade;
    fazenda.estado = estado;
    fazenda.hectaresAgricultaveis = hectaresAgricultaveis;
    fazenda.hectaresVegetacao = hectaresVegetacao;
    fazenda.totalDeHectares = totalDeHectares;

    return this.repository.save(fazenda);
  }

  async verificarSeVinculoComCulturaJaExiste(
    fazenda: Fazenda,
    cultura: Cultura
  ) {
    return this.repository
      .createQueryBuilder()
      .select("fc.*")
      .from("fazendas_culturas", "fc")
      .where("fc.fazendaId = :idFazenda", { idFazenda: fazenda.id })
      .andWhere("fc.culturaId = :idCultura", { idCultura: cultura.id })
      .limit(1)
      .getRawOne();
  }

  async vincularCultura(fazenda: Fazenda, novaCultura: Cultura) {
    const fazendasAtuais = fazenda.culturas;

    fazenda.culturas = [...fazendasAtuais, novaCultura];

    this.repository.save(fazenda);
  }
}
