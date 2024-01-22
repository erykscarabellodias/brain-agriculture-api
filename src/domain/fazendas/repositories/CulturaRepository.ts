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
}
