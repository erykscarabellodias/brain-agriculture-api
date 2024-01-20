import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import { EditarProdutorService } from "../../../../../src/domain/produtores/services/editarProdutor/EditarProdutorService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ClassValidatorError from "../../../../../src/shared/erros/class.validator.error";
import ValidarCnpjService from "../../../../../src/shared/services/validarCnpj/ValidarCnpjService";
import ValidarCpfService from "../../../../../src/shared/services/validarCpf/ValidarCpfService";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  produtorMock,
  produtorNaoEncontradoMock,
} from "../../../../mocks/produtor/produtoresMock";

describe("suíte de testes da edição de produtores", () => {
  const repository = new ProdutorRepository();
  const validarCpfService = new ValidarCpfService();
  const validarCnpjService = new ValidarCnpjService();
  const validarUuidService = new ValidarUuidService();

  const service = new EditarProdutorService(
    repository,
    validarCpfService,
    validarCnpjService,
    validarUuidService
  );

  it("não deve ser possível editar um produtor sem nome", () => {
    repository.buscarPorId = produtorMock;

    const dadosProdutor = {
      nomeProdutor: "",
      cpf: "097.772.810-21",
      cnpj: "",
    };

    const idProdutor = "ef7f4f80-255b-43b1-8de3-3d4da47f9ae5";

    expect(async () => {
      await service.editar(idProdutor, dadosProdutor);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("não deve ser possível editar um produtor sem CPF e sem CNPJ", () => {
    repository.buscarPorId = produtorMock;

    const dadosProdutor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "",
    };

    const idProdutor = "ef7f4f80-255b-43b1-8de3-3d4da47f9ae5";

    expect(async () => {
      await service.editar(idProdutor, dadosProdutor);
    }).rejects.toThrow(new AppError(400, "Envie o CPF ou o CNPF do produtor"));
  });

  it("não deve ser possível editar um produtor com CNPJ e CPF", () => {
    repository.buscarPorId = produtorMock;

    const dadosProdutor = {
      nomeProdutor: "João",
      cpf: "097.772.810-21",
      cnpj: "94.598.338/0001-30",
    };

    const idProdutor = "ef7f4f80-255b-43b1-8de3-3d4da47f9ae5";

    expect(async () => {
      await service.editar(idProdutor, dadosProdutor);
    }).rejects.toThrow(
      new AppError(400, "Envie o CPf ou o CNPJ do produtor, mas não os dois")
    );
  });

  it("não deve ser possível editar um produtor sem seu id", () => {
    const dadosProdutor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "34.636.578/0001-50",
    };

    const idProdutor = "";

    expect(async () => {
      await service.editar(idProdutor, dadosProdutor);
    }).rejects.toThrow(new AppError(400, "O campo idProdutor é obrigatório"));
  });

  it("não deve ser possível editar um produtor um CPF que já existe em outro produtor", () => {
    repository.buscarPorId = produtorMock;
    repository.buscarOutroProdutorComOMesmoCpf = produtorMock;

    const produtor = {
      nomeProdutor: "João",
      cpf: "097.772.810-21",
      cnpj: "",
    };

    const idProdutor = "ef7f4f80-255b-43b1-8de3-3d4da47f9ae5";

    expect(async () => {
      await service.editar(idProdutor, produtor);
    }).rejects.toThrow(
      new AppError(
        400,
        "Já existe outro produtor com este CPF cadastrado na plataforma"
      )
    );
  });

  it("não deve ser possível editar um produtor um CNPJ que já existe em outro produtor", () => {
    repository.buscarPorId = produtorMock;
    repository.buscarOutroProdutorComOMesmoCnpj = produtorMock;

    const dadosProdutor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "14.572.457/0001-85",
    };

    const idProdutor = "ef7f4f80-255b-43b1-8de3-3d4da47f9ae5";

    expect(async () => {
      await service.editar(idProdutor, dadosProdutor);
    }).rejects.toThrow(
      new AppError(
        400,
        "Já existe outro produtor com este CNPJ cadastrado na plataforma"
      )
    );
  });

  it("não deve ser possível editar um produtor que não existe", () => {
    repository.buscarPorId = produtorNaoEncontradoMock;

    const dadosProdutor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "14.572.457/0001-85",
    };

    const idProdutor = "ef7f4f80-255b-43b1-8de3-3d4da47f9ae5";

    expect(async () => {
      await service.editar(idProdutor, dadosProdutor);
    }).rejects.toThrow(new AppError(404, "Este produtor não existe"));
  });

  it("deve ser possível editar um produtor", async () => {
    repository.buscarPorId = produtorMock;
    repository.buscarOutroProdutorComOMesmoCnpj = produtorNaoEncontradoMock;
    repository.atualizar = produtorMock;

    const dadosProdutor = {
      nomeProdutor: "João",
      cpf: "",
      cnpj: "14.572.457/0001-85",
    };

    const idProdutor = "ef7f4f80-255b-43b1-8de3-3d4da47f9ae5";

    const produtorEditado = await service.editar(idProdutor, dadosProdutor);

    expect(produtorEditado).toHaveProperty("id");
    expect(produtorEditado).toHaveProperty("nomeProdutor");
    expect(produtorEditado).toHaveProperty("cnpj");
  });
});
