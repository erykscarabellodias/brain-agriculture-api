import ProdutorRepository from "../../../produtores/repositories/ProdutorRepository";
import FazendaRepository from "../../repositories/FazendaRepository";
import { AppError } from "../../../../shared/erros/app.error";
import { validate } from "class-validator";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import { plainToClass } from "class-transformer";
import ClassValidatorError from "../../../../shared/erros/class.validator.error";
import DadosFazendaInputDto from "../../dto/DadosFazendaInputDto";
import DadosFazendaOutputDto from "../../dto/DadosFazendaOutputDto";
import BuscarCepServiceViaCep from "../../../../shared/services/buscarCep/BuscarCepViaCepService";
import BuscarCepServiceInterface from "../../../../shared/services/buscarCep/BuscarCepServiceInterface";

export default class CriarFazendaService {
  constructor(
    private readonly fazendaRepository: FazendaRepository,
    private readonly produtorRepository: ProdutorRepository,
    private readonly validarUuidService: ValidarUuidService,
    private readonly buscarCepService: BuscarCepServiceInterface
  ) {}

  async criar(
    idProdutor: string,
    criarFazendaInputDto: DadosFazendaInputDto
  ): Promise<DadosFazendaOutputDto> {
    this.validarUuidService.validar(idProdutor);

    const proprietarioDaFazenda = await this.produtorRepository.buscarPorId(
      idProdutor
    );

    if (!proprietarioDaFazenda) {
      throw new AppError(400, "O produtor enviado não existe");
    }

    const errosDeValidacao = await validate(
      plainToClass(DadosFazendaInputDto, criarFazendaInputDto)
    );

    if (errosDeValidacao.length > 0) {
      throw new ClassValidatorError(errosDeValidacao);
    }

    const {
      nomeFazenda,
      hectaresAgricultaveis,
      hectaresVegetacao,
      totalDeHectares,
      cep,
    } = criarFazendaInputDto;

    const { cidade, estado } = await this.buscarCepService.buscar(cep);

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

    return new DadosFazendaOutputDto(novaFazenda);
  }
}
