import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import DadosFazendaInputDto from "../../../../../src/domain/fazendas/services/dto/DadosFazendaInputDto";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import ClassValidatorError from "../../../../../src/shared/erros/class.validator.error";
import {
  fazendaMock,
  fazendaNaoEncontradaMock,
  listaVaziaDeFazendasMock,
} from "../../../../mocks/fazenda/fazendasMock";
import EditarFazendaService from "../../../../../src/domain/fazendas/services/editarFazenda/EditarFazendaService";

describe("suite de testes da edição de fazendas", () => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const criarFazendaService = new EditarFazendaService(
    fazendaRepository,
    validarUuidService
  );

  it("não deve ser possível editar uma fazenda que não existe", async () => {
    fazendaRepository.buscarPorId = fazendaNaoEncontradaMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cidade: "São João da Boa Vista",
      estado: "SP",
      hectaresAgricultaveis: 1000,
      hectaresVegetacao: 100,
      totalDeHectares: 800,
    };

    const idFazenda = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.editar(idFazenda, fazenda);
    }).rejects.toThrow(new AppError(400, "Esta fazenda não existe"));
  });

  test.each([
    [
      {
        nomeFazenda: "",
        cidade: "São João da Boa Vista",
        estado: "SP",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "",
        estado: "SP",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "São João da Boa Vista",
        estado: "",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "São João da Boa Vista",
        estado: "SP",
        hectaresAgricultaveis: "",
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "São João da Boa Vista",
        estado: "SP",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: "",
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "São João da Boa Vista",
        estado: "SP",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: 100,
        totalDeHectares: "",
      },
    ],
  ])("campos não podem ser vazios", async (param) => {
    fazendaRepository.buscarPorId = fazendaMock;

    const idFazenda = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.editar(idFazenda, param);
    }).rejects.toThrow(ClassValidatorError);
  });

  test.each([
    [
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "São João da Boa Vista",
        estado: "SP",
        hectaresAgricultaveis: -1000,
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "São João da Boa Vista",
        estado: "SP",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: -100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cidade: "São João da Boa Vista",
        estado: "SP",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: 100,
        totalDeHectares: -800,
      },
    ],
  ])("campos de áreas não podem ser negativos", async (param) => {
    fazendaRepository.buscarPorId = fazendaMock;

    const idFazenda = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.editar(idFazenda, param);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("soma da área agricultável e da área de vegetação não pode ser maior que a área total", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstadoComOutroId =
      listaVaziaDeFazendasMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cidade: "São João da Boa Vista",
      estado: "SP",
      hectaresAgricultaveis: 1000,
      hectaresVegetacao: 400,
      totalDeHectares: 800,
    };

    const idFazenda = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.editar(idFazenda, fazenda);
    }).rejects.toThrow(
      new AppError(
        400,
        "A soma de área agricultável e vegetação, não pode ser maior que a área total da fazenda"
      )
    );
  });

  it("deve ser possível editar uma fazenda", async () => {
    fazendaRepository.buscarPorId = fazendaMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstadoComOutroId =
      listaVaziaDeFazendasMock;
    fazendaRepository.atualizar = fazendaMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cidade: "São João da Boa Vista",
      estado: "SP",
      hectaresAgricultaveis: 600,
      hectaresVegetacao: 400,
      totalDeHectares: 1000,
    };

    const idFazenda = "25b305c0-e03a-47dc-b350-60939c308b00";

    const fazendaCriada = await criarFazendaService.editar(idFazenda, fazenda);

    expect(fazendaCriada).toHaveProperty("id");
    expect(fazendaCriada).toHaveProperty("nomeFazenda");
    expect(fazendaCriada).toHaveProperty("cidade");
    expect(fazendaCriada).toHaveProperty("estado");
    expect(fazendaCriada).toHaveProperty("hectaresAgricultaveis");
    expect(fazendaCriada).toHaveProperty("hectaresVegetacao");
    expect(fazendaCriada).toHaveProperty("totalDeHectares");
    expect(fazendaCriada).toHaveProperty("deletedAt");
    expect(fazendaCriada).toHaveProperty("produtor");
  });
});
