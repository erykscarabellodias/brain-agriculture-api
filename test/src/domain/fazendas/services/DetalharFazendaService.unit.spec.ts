import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import DetalharFazendaService from "../../../../../src/domain/fazendas/services/detalharFazenda/DetalharFazendaService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  fazendaMock,
  fazendaNaoEncontradaMock,
} from "../../../../mocks/fazenda/fazendasMock";

describe("suíte de testes do detalhamento de fazendas", () => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const detalharFazendaService = new DetalharFazendaService(
    fazendaRepository,
    validarUuidService
  );

  it("não deve ser possível detalhar um fazenda que não existe", async () => {
    fazendaRepository.buscarPorId = fazendaNaoEncontradaMock;

    expect(async () => {
      await detalharFazendaService.detalhar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(404, "Esta fazenda não existe"));
  });

  it("deve ser possível detalhar um fazenda existente", async () => {
    fazendaRepository.buscarPorId = fazendaMock;

    const fazenda = await detalharFazendaService.detalhar(
      "89f19678-9a3b-4c76-b963-378514ad4ea2"
    );

    expect(fazenda).toHaveProperty("id");
    expect(fazenda).toHaveProperty("nomeFazenda");
    expect(fazenda).toHaveProperty("estado");
    expect(fazenda).toHaveProperty("cidade");
    expect(fazenda).toHaveProperty("totalDeHectares");
    expect(fazenda).toHaveProperty("hectaresAgricultaveis");
    expect(fazenda).toHaveProperty("hectaresVegetacao");
    expect(fazenda).toHaveProperty("deletedAt");
    expect(fazenda).toHaveProperty("produtor");
    expect(fazenda).toHaveProperty("culturas");
  });
});
