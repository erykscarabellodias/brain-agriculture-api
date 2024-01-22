import { AppError } from "../../../../shared/erros/app.error";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import Fazenda from "../../entities/Fazenda";
import CulturaRepository from "../../repositories/CulturaRepository";
import FazendaRepository from "../../repositories/FazendaRepository";

export default class DesvincularCulturaService {
  constructor(
    private readonly fazendaRepository: FazendaRepository,
    private readonly culturaRepository: CulturaRepository,
    private readonly validarUuidService: ValidarUuidService
  ) {}

  async desvincularCultura(
    idFazenda: string,
    idCultura: string
  ): Promise<Fazenda> {
    this.validarUuidService.validar(idFazenda);
    this.validarUuidService.validar(idCultura);

    const fazenda = await this.fazendaRepository.buscarPorId(idFazenda);

    if (!fazenda) {
      throw new AppError(404, "Esta fazenda não existe");
    }

    const cultura = await this.culturaRepository.buscarPorId(idCultura);

    if (!cultura) {
      throw new AppError(404, "Esta cultura não existe");
    }

    const fazendaJaTemCultura =
      await await this.fazendaRepository.verificarSeVinculoComCulturaJaExiste(
        fazenda,
        cultura
      );

    if (!fazendaJaTemCultura) {
      throw new AppError(
        400,
        "Esta fazenda não tem a cultura que você deseja desvincular"
      );
    }

    await this.fazendaRepository.desvincularCultura(fazenda, cultura);

    return fazenda;
  }
}
