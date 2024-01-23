import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import DadosFazendaInputDto from "../../../../../src/domain/fazendas/dto/DadosFazendaInputDto";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import ClassValidatorError from "../../../../../src/shared/erros/class.validator.error";
import {
  fazendaMock,
  fazendaNaoEncontradaMock,
  listaVaziaDeFazendasMock,
} from "../../../../mocks/fazenda/fazendasMock";
import EditarFazendaService from "../../../../../src/domain/fazendas/services/editarFazenda/EditarFazendaService";
import BuscarCepServiceViaCep from "../../../../../src/shared/services/buscarCep/BuscarCepViaCepService";
import { cepEncontrado } from "../../../../mocks/cep/cepMock";

describe("suite de testes da edição de fazendas", () => {
  const fazendaRepository = new FazendaRepository();
  const validarUuidService = new ValidarUuidService();
  const buscarCepService = new BuscarCepServiceViaCep();

  const criarFazendaService = new EditarFazendaService(
    fazendaRepository,
    validarUuidService,
    buscarCepService
  );

  it("não deve ser possível editar uma fazenda que não existe", async () => {
    buscarCepService.buscar = cepEncontrado;
    fazendaRepository.buscarPorId = fazendaNaoEncontradaMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cep: "13890000",
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
        cep: "13890000",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cep: "",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cep: "13890000",
        hectaresAgricultaveis: "",
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cep: "13890000",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: "",
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cep: "13890000",
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
        cep: "13890000",
        hectaresAgricultaveis: -1000,
        hectaresVegetacao: 100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cep: "13890000",
        hectaresAgricultaveis: 1000,
        hectaresVegetacao: -100,
        totalDeHectares: 800,
      },
      {
        nomeFazenda: "Fazenda Aliança",
        cep: "13890000",
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
    buscarCepService.buscar = cepEncontrado;
    fazendaRepository.buscarPorId = fazendaMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstadoComOutroId =
      listaVaziaDeFazendasMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cep: "13890000",
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
    buscarCepService.buscar = cepEncontrado;
    fazendaRepository.buscarPorId = fazendaMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstadoComOutroId =
      listaVaziaDeFazendasMock;
    fazendaRepository.atualizar = fazendaMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cep: "13890000",
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
