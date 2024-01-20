import { validate } from "class-validator";
import { Produtor } from "../../entities/Produtor";
import ProdutorRepository from "../../repositories/ProdutorRepository";
import { plainToClass } from "class-transformer";
import ClassValidatorError from "../../../../shared/erros/class.validator.error";
import { AppError } from "../../../../shared/erros/app.error";
import ValidarCpfService from "../../../../shared/services/validarCpf/ValidarCpfService";
import ValidarCnpjService from "../../../../shared/services/validarCnpj/ValidarCnpjService";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import DadosProdutorInputDto from "../../dto/DadosProdutorInputDto";

export class EditarProdutorService {
  constructor(
    private readonly repository: ProdutorRepository,
    private readonly validarCpfService: ValidarCpfService,
    private readonly validarCnpjService: ValidarCnpjService,
    private readonly validarUuidService: ValidarUuidService
  ) {}

  async editar(
    idProdutor: string,
    dadosProdutorInputDto: DadosProdutorInputDto
  ): Promise<Produtor> {
    if (!idProdutor) {
      throw new AppError(400, "O campo idProdutor é obrigatório");
    }

    this.validarUuidService.validar(idProdutor);

    const errosDeValidacao = await validate(
      plainToClass(DadosProdutorInputDto, dadosProdutorInputDto)
    );

    if (errosDeValidacao.length > 0) {
      throw new ClassValidatorError(errosDeValidacao);
    }

    const produtor = await this.repository.buscarPorId(idProdutor);

    if (!produtor) {
      throw new AppError(404, "Este produtor não existe");
    }

    const { nomeProdutor, cpf, cnpj } = dadosProdutorInputDto;

    await this.validarRecebimentoDoCpfOuCnpj(produtor, dadosProdutorInputDto);

    return await this.repository.atualizar(produtor, nomeProdutor, cpf, cnpj);
  }

  private async validarRecebimentoDoCpfOuCnpj(
    produtor: Produtor,
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

      const produtorComMesmoCpfJaExiste =
        await this.repository.buscarOutroProdutorComOMesmoCpf(produtor, cpf);

      if (produtorComMesmoCpfJaExiste) {
        throw new AppError(
          400,
          "Já existe outro produtor com este CPF cadastrado na plataforma"
        );
      }
    }

    if (cnpj) {
      this.validarCnpjService.validar(cnpj);

      const produtorComMesmoCnpjJaExiste =
        await this.repository.buscarOutroProdutorComOMesmoCnpj(produtor, cnpj);

      if (produtorComMesmoCnpjJaExiste) {
        throw new AppError(
          400,
          "Já existe outro produtor com este CNPJ cadastrado na plataforma"
        );
      }
    }
  }
}
