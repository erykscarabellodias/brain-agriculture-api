import { validate } from "class-validator";
import { Produtor } from "../../entities/Produtor";
import ProdutorRepository from "../../repositories/ProdutorRepository";
import { plainToClass } from "class-transformer";
import ClassValidatorError from "../../../../shared/erros/class.validator.error";
import { AppError } from "../../../../shared/erros/app.error";
import ValidarCpfService from "../../../../shared/services/validarCpf/ValidarCpfService";
import ValidarCnpjService from "../../../../shared/services/validarCnpj/ValidarCnpjService";
import DadosProdutorDto from "../../dto/DadosProdutorInputDto";
import DadosProdutorInputDto from "../../dto/DadosProdutorInputDto";

export class CriarProdutorService {
  private repository: ProdutorRepository;
  private validarCpfService: ValidarCpfService;
  private validarCnpjService: ValidarCnpjService;

  constructor(
    repository: ProdutorRepository,
    validarCpfService: ValidarCpfService,
    validarCnpjService: ValidarCnpjService
  ) {
    this.repository = repository;
    this.validarCpfService = validarCpfService;
    this.validarCnpjService = validarCnpjService;
  }

  async criar(dadosProdutorInputDto: DadosProdutorInputDto): Promise<Produtor> {
    const errosDeValidacao = await validate(
      plainToClass(DadosProdutorInputDto, dadosProdutorInputDto)
    );

    if (errosDeValidacao.length > 0) {
      throw new ClassValidatorError(errosDeValidacao);
    }

    const { nomeProdutor, cpf, cnpj } = dadosProdutorInputDto;

    await this.validarRecebimentoDoCpfOuCnpj(dadosProdutorInputDto);

    return await this.repository.criar(nomeProdutor, cpf, cnpj);
  }

  private async validarRecebimentoDoCpfOuCnpj(
    dadosProdutorInputDto: DadosProdutorInputDto
  ): Promise<void> {
    const { cpf, cnpj } = dadosProdutorInputDto;

    if (cpf && cnpj) {
      throw new AppError(
        400,
        "Envie o CPf ou o CNPJ do produtor, mas não os dois"
      );
    }

    if (!cpf && !cnpj) {
      throw new AppError(400, "Envie o CPF ou o CNPF do produtor");
    }

    if (cpf) {
      this.validarCpfService.validar(cpf);

      const produtorComMesmoCpfJaExiste = await this.repository.buscarPorCpf(
        cpf
      );

      if (produtorComMesmoCpfJaExiste) {
        throw new AppError(
          400,
          "Já existe um produtor com este CPF cadastrado na plataforma"
        );
      }
    }

    if (cnpj) {
      this.validarCnpjService.validar(cnpj);

      const produtorComMesmoCnpjJaExiste = await this.repository.buscarPorCnpj(
        cnpj
      );

      if (produtorComMesmoCnpjJaExiste) {
        throw new AppError(
          400,
          "Já existe um produtor com este CNPJ cadastrado na plataforma"
        );
      }
    }
  }
}
