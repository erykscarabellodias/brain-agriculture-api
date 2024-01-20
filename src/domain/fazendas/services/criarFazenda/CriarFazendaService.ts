import CriarFazendaInputDto from "./dto/CriarFazendaInputDto";
import ProdutorRepository from "../../../produtores/repositories/ProdutorRepository";
import FazendaRepository from "../../repositories/FazendaRepository";
import { AppError } from "../../../../shared/erros/app.error";
import { validate } from "class-validator";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import { plainToClass } from "class-transformer";
import ClassValidatorError from "../../../../shared/erros/class.validator.error";

export default class CriarFazendaService {
  private fazendaRepository: FazendaRepository;
  private produtorRepository: ProdutorRepository;
  private validarUuidService: ValidarUuidService;

  constructor(
    fazendaRepository: FazendaRepository,
    produtorRepository: ProdutorRepository,
    validarUuidService: ValidarUuidService
  ) {
    this.fazendaRepository = fazendaRepository;
    this.produtorRepository = produtorRepository;
    this.validarUuidService = validarUuidService;
  }

  async criar(
    idProdutor: string,
    criarFazendaInputDto: CriarFazendaInputDto
  ): Promise<CriarFazendaOutputDto> {
    this.validarUuidService.validar(idProdutor);

    const proprietarioDaFazenda = await this.produtorRepository.buscarPorId(
      idProdutor
    );

    if (!proprietarioDaFazenda) {
      throw new AppError(400, "O produtor enviado não existe");
    }

    const errosDeValidacao = await validate(
      plainToClass(CriarFazendaInputDto, criarFazendaInputDto)
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
    } = criarFazendaInputDto;

    const fazendaJaEstaCadastrada =
      await this.fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstado(
        proprietarioDaFazenda,
        nomeFazenda,
        cidade,
        estado
      );

    if (fazendaJaEstaCadastrada) {
      throw new AppError(400, "Esta fazenda já está cadastrada");
    }

    if (hectaresAgricultaveis + hectaresVegetacao > totalDeHectares) {
      throw new AppError(
        400,
        "A soma de área agricultável e vegetação, não pode ser maior que a área total da fazenda"
      );
    }

    const novaFazenda = await this.fazendaRepository.criar(
      nomeFazenda,
      cidade,
      estado,
      hectaresAgricultaveis,
      hectaresVegetacao,
      totalDeHectares,
      proprietarioDaFazenda
    );

    return new CriarFazendaOutputDto(novaFazenda);
  }
}
