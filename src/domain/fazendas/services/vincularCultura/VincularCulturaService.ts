import { validate } from "class-validator";
import { AppError } from "../../../../shared/erros/app.error";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import Fazenda from "../../entities/Fazenda";
import CulturaRepository from "../../repositories/CulturaRepository";
import FazendaRepository from "../../repositories/FazendaRepository";
import VincularCulturaDto from "./dto/VincularCulturaDto";
import { plainToClass } from "class-transformer";
import ClassValidatorError from "../../../../shared/erros/class.validator.error";

export default class VincularCulturaService {
  constructor(
    private readonly fazendaRepository: FazendaRepository,
    private readonly culturaRepository: CulturaRepository,
    private readonly validarUuidService: ValidarUuidService
  ) {}

  async vincularCultura(
    idFazenda: string,
    vincularCulturaDto: VincularCulturaDto
  ): Promise<Fazenda> {
    if (!idFazenda) {
      throw new AppError(400, "O campo idFazenda é obrigatório");
    }

    this.validarUuidService.validar(idFazenda);

    const errosDeValidacao = await validate(
      plainToClass(VincularCulturaDto, vincularCulturaDto)
    );

    if (errosDeValidacao.length > 0) {
      throw new ClassValidatorError(errosDeValidacao);
    }

    const fazenda = await this.fazendaRepository.buscarPorId(idFazenda);

    if (!fazenda) {
      throw new AppError(404, "Esta fazenda não existe");
    }

    const cultura = await this.culturaRepository.buscarPorId(
      vincularCulturaDto.idCultura
    );

    if (!cultura) {
      throw new AppError(400, "Esta cultura não existe");
    }

    const fazendaJaTemCultura =
      await await this.fazendaRepository.verificarSeVinculoComCulturaJaExiste(
        fazenda,
        cultura
      );

    if (fazendaJaTemCultura) {
      throw new AppError(400, "Esta fazenda já tem esta cultura vinculada");
    }

    await this.fazendaRepository.vincularCultura(fazenda, cultura);

    return fazenda;
  }
}
