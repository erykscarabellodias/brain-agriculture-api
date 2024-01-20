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

    const Fazenda = await this.fazendaRepository.buscarPorId(idProdutor);

    if (!Fazenda) {
      throw new AppError(404, "Esta fazenda não existe");
    }

    if (Fazenda.deletedAt) {
      throw new AppError(400, "Esta fazenda já está desativada");
    }

    return await this.fazendaRepository.apagar(Fazenda);
  }
}
