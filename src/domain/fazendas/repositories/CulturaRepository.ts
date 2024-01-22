import { Repository } from "typeorm";
import { appDataSource } from "../../../config/database/typeorm/data-source";
import Cultura from "../entities/Cultura";

export default class CulturaRepository {
  private repository: Repository<Cultura>;

  constructor() {
    this.repository = appDataSource.getRepository(Cultura);
  }

  async buscarPorId(id: string): Promise<Cultura | null> {
    return this.repository.findOne({ where: { id } });
  }

  async fazendasPorCultura() {
    return this.repository
      .createQueryBuilder("cultura")
      .select("cultura.tipo as cultura")
      .addSelect("COUNT(cultura.id)", "quantidadeDeFazendas")
      .innerJoin("cultura.fazendas", "fazendas")
      .innerJoin("fazendas.produtor", "produtor")
      .where('produtor."deletedAt" IS NULL')
      .andWhere('fazendas."deletedAt" IS NULL')
      .groupBy("cultura.tipo, cultura.*")
      .orderBy("COUNT(cultura.id)", "DESC")
      .getRawMany();
  }
}
