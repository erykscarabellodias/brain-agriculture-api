import { validate } from "class-validator";
import { Produtor } from "../../entities/Produtor";
import ProdutorRepository from "../../repositories/ProdutorRepository";
import CriarProdutorInputDto from "./dto/CriarProdutorInputDto";
import { plainToClass } from "class-transformer";
import ClassValidatorError from "../../../../shared/erros/class.validator.error";
import { AppError } from "../../../../shared/erros/app.error";
import ValidarCpfService from "../../../../shared/services/validarCpf/ValidarCpfService";
import ValidarCnpjService from "../../../../shared/services/validarCnpj/ValidarCnpjService";

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

  async criar(criarProdutorInputDto: CriarProdutorInputDto): Promise<Produtor> {
    const errosDeValidacao = await validate(
      plainToClass(CriarProdutorInputDto, criarProdutorInputDto)
    );

    if (errosDeValidacao.length > 0) {
      throw new ClassValidatorError(errosDeValidacao);
    }

    const { nomeProdutor, cpf, cnpj } = criarProdutorInputDto;

    await this.validarRecebimentoDoCpfOuCnpj(criarProdutorInputDto);

    return await this.repository.criar(nomeProdutor, cpf, cnpj);
  }

  private async validarRecebimentoDoCpfOuCnpj(
    criarProdutorInputDto: CriarProdutorInputDto
  ): Promise<void> {
    const { cpf, cnpj } = criarProdutorInputDto;

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

      const usuarioComMesmoCpfJaExiste = await this.repository.buscarPorCpf(
        cpf
      );

      if (usuarioComMesmoCpfJaExiste) {
        throw new AppError(
          400,
          "Já existe um usuário com este CPF cadastrado na plataforma"
        );
      }
    }

    if (cnpj) {
      this.validarCnpjService.validar(cnpj);

      const usuarioComMesmoCnpjJaExiste = await this.repository.buscarPorCnpj(
        cnpj
      );

      if (usuarioComMesmoCnpjJaExiste) {
        throw new AppError(
          400,
          "Já existe um usuário com este CNPJ cadastrado na plataforma"
        );
      }
    }
  }
}
