import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import { CriarProdutorService } from "../../../../../src/domain/produtores/services/criarProdutor/CriarProdutorService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ClassValidatorError from "../../../../../src/shared/erros/class.validator.error";
import ValidarCnpjService from "../../../../../src/shared/services/validarCnpj/ValidarCnpjService";
import ValidarCpfService from "../../../../../src/shared/services/validarCpf/ValidarCpfService";
import {
  produtorMock,
  produtorNaoEncontradoMock,
} from "../../../../mocks/produtor/produtoresMock";

describe("suíte de testes da criação de produtores", () => {
  const repository = new ProdutorRepository();
  const validarCpfService = new ValidarCpfService();
  const validarCnpjService = new ValidarCnpjService();

  const service = new CriarProdutorService(
    repository,
    validarCpfService,
    validarCnpjService
  );

  it("não deve ser possível criar um produtor sem nome", () => {
    const produtor = {
      nomeProdutor: "",
      cpf: "097.772.810-21",
      cnpj: "",
    };

    expect(async () => {
      await service.criar(produtor);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("não deve ser possível criar um produtor sem CPF e sem CNPJ", () => {
    const produtor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "",
    };

    expect(async () => {
      await service.criar(produtor);
    }).rejects.toThrow(new AppError(400, "Envie o CPF ou o CNPF do produtor"));
  });

  it("não deve ser possível criar um produtor com CNPJ e CPF", () => {
    const produtor = {
      nomeProdutor: "João",
      cpf: "097.772.810-21",
      cnpj: "94.598.338/0001-30",
    };

    expect(async () => {
      await service.criar(produtor);
    }).rejects.toThrow(
      new AppError(400, "Envie o CPf ou o CNPJ do produtor, mas não os dois")
    );
  });

  it("não deve ser possível criar um produtor um CPF que já existe", () => {
    repository.buscarPorCpf = produtorMock;

    const produtor = {
      nomeProdutor: "João",
      cpf: "097.772.810-21",
      cnpj: "",
    };

    expect(async () => {
      await service.criar(produtor);
    }).rejects.toThrow(
      new AppError(
        400,
        "Já existe um produtor com este CPF cadastrado na plataforma"
      )
    );
  });

  it("não deve ser possível criar um produtor um CNPJ que já existe", () => {
    repository.buscarPorCnpj = produtorMock;

    const produtor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "14.572.457/0001-85",
    };

    expect(async () => {
      await service.criar(produtor);
    }).rejects.toThrow(
      new AppError(
        400,
        "Já existe um produtor com este CNPJ cadastrado na plataforma"
      )
    );
  });

  it("deve ser possível criar um produtor", async () => {
    repository.buscarPorId = produtorMock;
    repository.buscarPorCnpj = produtorNaoEncontradoMock;
    repository.criar = produtorMock;

    const dadosProdutor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "14.572.457/0001-85",
    };

    const produtorEditado = await service.criar(dadosProdutor);

    expect(produtorEditado).toHaveProperty("id");
    expect(produtorEditado).toHaveProperty("nomeProdutor");
    expect(produtorEditado).toHaveProperty("cnpj");
    expect(produtorEditado.deletedAt).toBeNull();
  });
});
