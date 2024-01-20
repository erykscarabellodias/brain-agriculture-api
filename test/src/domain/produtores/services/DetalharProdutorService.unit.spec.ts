import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import DetalharProdutorService from "../../../../../src/domain/produtores/services/detalharProdutor/DetalharProdutorService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  produtorMock,
  produtorNaoEncontrado,
} from "../../../../mocks/produtor/produtoresMock";

describe("suíte de testes do detalhamento de produtores", () => {
  const produtorRepository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const detalharProdutorService = new DetalharProdutorService(
    produtorRepository,
    validarUuidService
  );

  it("não deve ser possível detalhar um produtor que não existe", async () => {
    produtorRepository.buscarPorId = produtorNaoEncontrado;

    expect(async () => {
      await detalharProdutorService.detalhar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(404, "Este produtor não existe"));
  });

  it("deve ser possível detalhar um produtor existente", async () => {
    produtorRepository.buscarPorId = produtorMock;

    const produtor = await detalharProdutorService.detalhar(
      "89f19678-9a3b-4c76-b963-378514ad4ea2"
    );

    expect(produtor).toHaveProperty("id");
    expect(produtor).toHaveProperty("nomeProdutor");
    expect(produtor).toHaveProperty("cpf");
    expect(produtor).toHaveProperty("cnpj");
    expect(produtor).toHaveProperty("deletedAt");
    expect(produtor).toHaveProperty("fazendas");
  });
});
