import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import ReativarProdutorService from "../../../../../src/domain/produtores/services/reativarProdutor/ReativarProdutorService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  produtorApagadoMock,
  produtorMock,
  produtorNaoEncontrado,
} from "../../../../mocks/produtor/produtoresMock";

describe("suíte de testes do service de reativação de produtores", () => {
  const produtorRepository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const reativarProdutorService = new ReativarProdutorService(
    produtorRepository,
    validarUuidService
  );

  it("não deve ser possível reativar um produtor que não existe", async () => {
    produtorRepository.buscarPorId = produtorNaoEncontrado;

    expect(async () => {
      await reativarProdutorService.reativar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(404, "Este produtor não existe"));
  });

  it("não deve ser possível reativar um produtor que já está ativo", async () => {
    produtorRepository.buscarPorId = produtorMock;

    expect(async () => {
      await reativarProdutorService.reativar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(400, "Este produtor já está ativo"));
  });

  it("deve ser possível reativar um produtor existente", async () => {
    produtorRepository.buscarPorId = produtorApagadoMock;
    produtorRepository.reativar = produtorMock;

    const produtorApagado = await reativarProdutorService.reativar(
      "89f19678-9a3b-4c76-b963-378514ad4ea2"
    );

    expect(produtorApagado.deletedAt).toBeNull();
  });
});
