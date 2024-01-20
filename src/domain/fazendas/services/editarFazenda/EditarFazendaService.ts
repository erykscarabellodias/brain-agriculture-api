import FazendaRepository from "../../repositories/FazendaRepository";
import { AppError } from "../../../../shared/erros/app.error";
import { validate } from "class-validator";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import { plainToClass } from "class-transformer";
import ClassValidatorError from "../../../../shared/erros/class.validator.error";
import DadosFazendaInputDto from "../dto/DadosFazendaInputDto";
import DadosFazendaOutputDto from "../dto/DadosFazendaOutputDto";

export default class EditarFazendaService {
  constructor(
    private readonly fazendaRepository: FazendaRepository,
    private readonly validarUuidService: ValidarUuidService
  ) {}

  async editar(
    idFazenda: string,
    dadosFazendaInputDto: DadosFazendaInputDto
  ): Promise<DadosFazendaOutputDto> {
    this.validarUuidService.validar(idFazenda);

    const fazenda = await this.fazendaRepository.buscarPorId(idFazenda);

    if (!fazenda) {
      throw new AppError(404, "Esta fazenda não existe");
    }

    const errosDeValidacao = await validate(
      plainToClass(DadosFazendaInputDto, dadosFazendaInputDto)
    );

    if (errosDeValidacao.length > 0) {
      throw new ClassValidatorError(errosDeValidacao);
    }

    const {
      nomeFazenda,
      cidade,
      estado,
      hectaresAgricultaveis,
      hectaresVegetacao,
      totalDeHectares,
    } = dadosFazendaInputDto;

    const existeOutraFazendaIgualDoMesmoDono =
      await this.fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstadoComOutroId(
        fazenda,
        nomeFazenda,
        cidade,
        estado
      );

    if (existeOutraFazendaIgualDoMesmoDono.length !== 0) {
      throw new AppError(400, "Esta fazenda já está cadastrada");
    }

    if (hectaresAgricultaveis + hectaresVegetacao > totalDeHectares) {
      throw new AppError(
        400,
        "A soma de área agricultável e vegetação, não pode ser maior que a área total da fazenda"
      );
    }

    const fazendaAtualizada = await this.fazendaRepository.atualizar(
      fazenda,
      nomeFazenda,
      cidade,
      estado,
      hectaresAgricultaveis,
      hectaresVegetacao,
      totalDeHectares
    );

    return new DadosFazendaOutputDto(fazendaAtualizada);
  }
}
