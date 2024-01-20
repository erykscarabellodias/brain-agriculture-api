import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import ApagarProdutorService from "../../../../../src/domain/produtores/services/apagarProdutor/ApagarProdutorService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  produtorApagadoMock,
  produtorMock,
  produtorNaoEncontrado,
} from "../../../../mocks/produtor/produtoresMock";

describe("suíte de testes do service que apaga produtores", () => {
  const produtorRepository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const apagarProdutorService = new ApagarProdutorService(
    produtorRepository,
    validarUuidService
  );

  it("não deve ser possível apagar um produtor que não existe", async () => {
    produtorRepository.buscarPorId = produtorNaoEncontrado;

    expect(async () => {
      await apagarProdutorService.apagar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(404, "Este produtor não existe"));
  });

  it("não deve ser possível apagar um produtor que já foi apagado", async () => {
    produtorRepository.buscarPorId = produtorApagadoMock;

    expect(async () => {
      await apagarProdutorService.apagar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(404, "Este produtor já está desativado"));
  });

  it("deve ser possível apagar um produtor existente", async () => {
    produtorRepository.buscarPorId = produtorMock;
    produtorRepository.apagar = produtorApagadoMock;

    const produtorApagado = await apagarProdutorService.apagar(
      "89f19678-9a3b-4c76-b963-378514ad4ea2"
    );

    expect(produtorApagado.deletedAt).not.toBeNull();
  });
});
