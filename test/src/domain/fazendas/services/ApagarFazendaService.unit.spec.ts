import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import ApagarFazendaService from "../../../../../src/domain/fazendas/services/apagarFazenda/ApagarFazendaService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  fazendaApagadaMock,
  fazendaMock,
  fazendaNaoEncontradaMock,
} from "../../../../mocks/fazenda/fazendasMock";

describe("suíte de testes do service que apaga fazendas", () => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const apagarFazendaService = new ApagarFazendaService(
    fazendaRepository,
    validarUuidService
  );

  it("não deve ser possível apagar um fazenda que não existe", async () => {
    fazendaRepository.buscarPorId = fazendaNaoEncontradaMock;

    expect(async () => {
      await apagarFazendaService.apagar("89f19678-9a3b-4c76-b963-378514ad4ea2");
    }).rejects.toThrow(new AppError(404, "Esta fazenda não existe"));
  });

  it("não deve ser possível apagar um fazenda que já foi apagado", async () => {
    fazendaRepository.buscarPorId = fazendaApagadaMock;

    expect(async () => {
      await apagarFazendaService.apagar("89f19678-9a3b-4c76-b963-378514ad4ea2");
    }).rejects.toThrow(new AppError(400, "Esta fazenda já está desativada"));
  });

  it("deve ser possível apagar um fazenda existente", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    fazendaRepository.apagar = fazendaApagadaMock;

    const fazendaApagado = await apagarFazendaService.apagar(
      "89f19678-9a3b-4c76-b963-378514ad4ea2"
    );

    expect(fazendaApagado.deletedAt).not.toBeNull();
  });
});
