import { AppError } from "../../../../shared/erros/app.error";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import Fazenda from "../../entities/Fazenda";

import FazendaRepository from "../../repositories/FazendaRepository";

export default class ApagarFazendaService {
  constructor(
    private readonly fazendaRepository: FazendaRepository,
    private readonly validarUuidService: ValidarUuidService
  ) {}

  async apagar(idProdutor: string): Promise<Fazenda> {
    this.validarUuidService.validar(idProdutor);

    const fazenda = await this.fazendaRepository.buscarPorId(idProdutor);

    if (!fazenda) {
      throw new AppError(404, "Esta fazenda não existe");
    }

    if (fazenda.deletedAt) {
      throw new AppError(400, "Esta fazenda já está desativada");
    }

    return await this.fazendaRepository.apagar(fazenda);
  }
}
