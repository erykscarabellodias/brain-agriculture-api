import CulturaRepository from "../../../../../src/domain/fazendas/repositories/CulturaRepository";
import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import DesvincularCulturaService from "../../../../../src/domain/fazendas/services/desvincularCultura/DesvincularCulturaService";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  culturaMock,
  culturaNaoEncontradaMock,
} from "../../../../mocks/cultura/culturaMock";
import {
  fazendaJaTemCulturaMock,
  fazendaMock,
  fazendaNaoEncontradaMock,
  fazendaNaoTemCulturaCadastradaMock,
} from "../../../../mocks/fazenda/fazendasMock";

describe("suíte de testes da desvinculação de cultura da fazenda", () => {
  const fazendaRepository = new FazendaRepository();
  const culturaRepository = new CulturaRepository();
  const validarUuidService = new ValidarUuidService();

  const desvincularCulturaService = new DesvincularCulturaService(
    fazendaRepository,
    culturaRepository,
    validarUuidService
  );

  it("o campo idCultura deve ser um UUID", async () => {
    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const idCultura = "1";

    expect(async () => {
      await desvincularCulturaService.desvincularCultura(idFazenda, idCultura);
    }).rejects.toThrow(new AppError(400, "O id enviado não é válido"));
  });

  it("o campo idFazenda deve ser um UUID", async () => {
    const idFazenda = "1";
    const idCultura = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";

    expect(async () => {
      await desvincularCulturaService.desvincularCultura(idFazenda, idCultura);
    }).rejects.toThrow(new AppError(400, "O id enviado não é válido"));
  });

  it("não deve ser possível desvincular uma cultura de uma fazenda que não existe", async () => {
    fazendaRepository.buscarPorId = fazendaNaoEncontradaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const idCultura = "8a06f211-d20f-402c-9135-b01dd89158a2";

    expect(async () => {
      await desvincularCulturaService.desvincularCultura(idFazenda, idCultura);
    }).rejects.toThrow(new AppError(404, "Esta fazenda não existe"));
  });

  it("não deve ser possível desvincular uma cultura que não existe de uma fazenda", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    culturaRepository.buscarPorId = culturaNaoEncontradaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const idCultura = "8a06f211-d20f-402c-9135-b01dd89158a2";

    expect(async () => {
      await desvincularCulturaService.desvincularCultura(idFazenda, idCultura);
    }).rejects.toThrow(new AppError(404, "Esta cultura não existe"));
  });

  it("não deve ser possível desvincular uma cultura que não está vinculada a uma fazenda", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    culturaRepository.buscarPorId = culturaMock;
    fazendaRepository.verificarSeVinculoComCulturaJaExiste =
      fazendaNaoTemCulturaCadastradaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const idCultura = "8a06f211-d20f-402c-9135-b01dd89158a2";

    expect(async () => {
      await desvincularCulturaService.desvincularCultura(idFazenda, idCultura);
    }).rejects.toThrow(
      new AppError(
        400,
        "Esta fazenda não tem a cultura que você deseja desvincular"
      )
    );
  });

  it("deve ser possível desvincular uma cultura de uma fazenda", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    culturaRepository.buscarPorId = culturaMock;
    fazendaRepository.verificarSeVinculoComCulturaJaExiste =
      fazendaJaTemCulturaMock;
    fazendaRepository.desvincularCultura = fazendaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const idCultura = "0bee6ab9-44d6-4916-b208-dede0de028b9";

    await desvincularCulturaService.desvincularCultura(idFazenda, idCultura);

    expect(fazendaRepository.desvincularCultura).toHaveBeenCalled();
  });
});
