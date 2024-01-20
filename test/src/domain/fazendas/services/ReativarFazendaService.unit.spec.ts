import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import ReativarFazendaService from "../../../../../src/domain/fazendas/services/reativarFazenda/ReativarFazendaService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  fazendaApagadaMock,
  fazendaMock,
  fazendaNaoEncontradaMock,
} from "../../../../mocks/fazenda/fazendasMock";

describe("suíte de testes do service que reativa fazendas", () => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const reativarFazendaService = new ReativarFazendaService(
    fazendaRepository,
    validarUuidService
  );

  it("não deve ser possível reativar um fazenda que não existe", async () => {
    fazendaRepository.buscarPorId = fazendaNaoEncontradaMock;

    expect(async () => {
      await reativarFazendaService.reativar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(404, "Esta fazenda não existe"));
  });

  it("não deve ser possível reativar um fazenda que já foi reativada", async () => {
    fazendaRepository.buscarPorId = fazendaMock;

    expect(async () => {
      await reativarFazendaService.reativar(
        "89f19678-9a3b-4c76-b963-378514ad4ea2"
      );
    }).rejects.toThrow(new AppError(400, "Esta fazenda já está ativa"));
  });

  it("deve ser possível reativar um fazenda existente", async () => {
    fazendaRepository.buscarPorId = fazendaApagadaMock;
    fazendaRepository.reativar = fazendaMock;

    const fazendaReativada = await reativarFazendaService.reativar(
      "89f19678-9a3b-4c76-b963-378514ad4ea2"
    );

    expect(fazendaReativada.deletedAt).toBeNull();
  });
});
