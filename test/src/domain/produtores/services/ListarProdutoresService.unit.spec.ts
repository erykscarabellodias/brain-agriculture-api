import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import ListarProdutoresService from "../../../../../src/domain/produtores/services/listarProdutores/ListarProdutoresService";
import {
  listaDeProdutoresAtivosMock,
  listaDeProdutoresVaziaMock,
} from "../../../../mocks/produtor/produtoresMock";

describe("suíte de testes da listagem de produtores", () => {
  const repository = new ProdutorRepository();
  const service = new ListarProdutoresService(repository);

  it("deve receber uma lista de produtores ativos se parametro ativo não for true", async () => {
    repository.listar = listaDeProdutoresAtivosMock;

    const produtores = await service.listar(false);

    expect(produtores).toHaveLength(2);

    produtores.forEach((produtor) => {
      expect(produtor.deletedAt).toBeNull();
    });
  });

  it("deve retornar uma lista vazia se não existirem registros", async () => {
    repository.listar = listaDeProdutoresVaziaMock;

    const produtores = await service.listar(true);

    expect(produtores).toHaveLength(0);
    expect(produtores).toEqual([]);
  });
});
