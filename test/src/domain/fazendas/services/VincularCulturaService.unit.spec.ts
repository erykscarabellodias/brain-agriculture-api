import CulturaRepository from "../../../../../src/domain/fazendas/repositories/CulturaRepository";
import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import VincularCulturaService from "../../../../../src/domain/fazendas/services/vincularCultura/VincularCulturaService";
import VincularCulturaDto from "../../../../../src/domain/fazendas/services/vincularCultura/dto/VincularCulturaDto";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ClassValidatorError from "../../../../../src/shared/erros/class.validator.error";
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

describe("suíte de testes da vinculação de cultura à fazenda", () => {
  const fazendaRepository = new FazendaRepository();
  const culturaRepository = new CulturaRepository();
  const validarUuidService = new ValidarUuidService();

  const vincularCulturaService = new VincularCulturaService(
    fazendaRepository,
    culturaRepository,
    validarUuidService
  );

  it("o campo idCultura deve ser enviado", async () => {
    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const cultura: VincularCulturaDto = {
      idCultura: "",
    };

    expect(async () => {
      await vincularCulturaService.vincularCultura(idFazenda, cultura);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("o campo idCultura deve ser um UUID", async () => {
    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const cultura: VincularCulturaDto = {
      idCultura: "1",
    };

    expect(async () => {
      await vincularCulturaService.vincularCultura(idFazenda, cultura);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("o campo idFazenda deve ser um UUID", async () => {
    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const cultura: VincularCulturaDto = {
      idCultura: "1",
    };

    expect(async () => {
      await vincularCulturaService.vincularCultura(idFazenda, cultura);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("não deve ser possível cadastrar uma cultura para uma fazenda que não existe", async () => {
    fazendaRepository.buscarPorId = fazendaNaoEncontradaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const cultura: VincularCulturaDto = {
      idCultura: "0bee6ab9-44d6-4916-b208-dede0de028b9",
    };

    expect(async () => {
      await vincularCulturaService.vincularCultura(idFazenda, cultura);
    }).rejects.toThrow(new AppError(404, "Esta fazenda não existe"));
  });

  it("não deve ser possível cadastrar uma cultura que não existe em uma fazenda", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    culturaRepository.buscarPorId = culturaNaoEncontradaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const cultura: VincularCulturaDto = {
      idCultura: "0bee6ab9-44d6-4916-b208-dede0de028b9",
    };

    expect(async () => {
      await vincularCulturaService.vincularCultura(idFazenda, cultura);
    }).rejects.toThrow(new AppError(400, "Esta cultura não existe"));
  });

  it("não deve ser possível cadastrar duas vezes a mesma cultura para a mesma fazenda", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    culturaRepository.buscarPorId = culturaMock;
    fazendaRepository.verificarSeVinculoComCulturaJaExiste =
      fazendaJaTemCulturaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const cultura: VincularCulturaDto = {
      idCultura: "0bee6ab9-44d6-4916-b208-dede0de028b9",
    };

    expect(async () => {
      await vincularCulturaService.vincularCultura(idFazenda, cultura);
    }).rejects.toThrow(
      new AppError(400, "Esta fazenda já tem esta cultura vinculada")
    );
  });

  it("deve ser possível vincular uma cultura a uma fazenda", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    culturaRepository.buscarPorId = culturaMock;
    fazendaRepository.verificarSeVinculoComCulturaJaExiste =
      fazendaNaoTemCulturaCadastradaMock;
    fazendaRepository.vincularCultura = fazendaMock;

    const idFazenda = "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4";
    const cultura: VincularCulturaDto = {
      idCultura: "0bee6ab9-44d6-4916-b208-dede0de028b9",
    };

    const fazendaComCulturaCadastrada =
      await vincularCulturaService.vincularCultura(idFazenda, cultura);

    expect(fazendaComCulturaCadastrada).toHaveProperty("culturas");
    expect(fazendaComCulturaCadastrada.culturas).toHaveLength(1);
  });
});
