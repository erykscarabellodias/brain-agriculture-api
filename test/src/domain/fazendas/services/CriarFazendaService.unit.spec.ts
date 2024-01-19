import { serialize } from "class-transformer";
import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import CriarFazendaService from "../../../../../src/domain/fazendas/services/criarFazenda/CriarFazendaService";
import CriarFazendaInputDto from "../../../../../src/domain/fazendas/services/criarFazenda/dto/CriarFazendaInputDto";
import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  produtorMock,
  produtorNaoEncontrado,
} from "../../../../mocks/produtor/produtoresMock";
import ClassValidatorError from "../../../../../src/shared/erros/class.validator.error";
import {
  fazendaMock,
  fazendaNaoEncontrada,
} from "../../../../mocks/fazenda/fazendasMock";

describe("suite de testes da criação de fazendas", () => {
  const fazendaRepository = new FazendaRepository();
  const produtorRepository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const criarFazendaService = new CriarFazendaService(
    fazendaRepository,
    produtorRepository,
    validarUuidService
  );

  it("não deve ser possível criar uma fazenda para um produtor que não existe", async () => {
    produtorRepository.buscarPorId = produtorNaoEncontrado;

    const fazenda: CriarFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cidade: "São João da Boa Vista",
      estado: "SP",
      hectaresAgricultaveis: 1000,
      hectaresVegetacao: 100,
      totalDeHectares: 800,
    };

    const idProdutor = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.criar(idProdutor, fazenda);
    }).rejects.toThrow(new AppError(400, "O produtor enviado não existe"));
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
    produtorRepository.buscarPorId = produtorMock;

    const idProdutor = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.criar(idProdutor, param);
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
    produtorRepository.buscarPorId = produtorMock;

    const idProdutor = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.criar(idProdutor, param);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("soma da área agricultável e da área de vegetação não pode ser maior que a área total", async () => {
    produtorRepository.buscarPorId = produtorMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstado =
      fazendaNaoEncontrada;

    const fazenda: CriarFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cidade: "São João da Boa Vista",
      estado: "SP",
      hectaresAgricultaveis: 1000,
      hectaresVegetacao: 400,
      totalDeHectares: 800,
    };

    const idProdutor = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.criar(idProdutor, fazenda);
    }).rejects.toThrow(
      new AppError(
        400,
        "A soma de área agricultável e vegetação, não pode ser maior que a área total da fazenda"
      )
    );
  });

  it("deve ser possível criar uma fazenda", async () => {
    produtorRepository.buscarPorId = produtorMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstado =
      fazendaNaoEncontrada;
    fazendaRepository.criar = fazendaMock;

    const fazenda: CriarFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cidade: "São João da Boa Vista",
      estado: "SP",
      hectaresAgricultaveis: 600,
      hectaresVegetacao: 400,
      totalDeHectares: 1000,
    };

    const idProdutor = "25b305c0-e03a-47dc-b350-60939c308b00";

    const fazendaCriada = await criarFazendaService.criar(idProdutor, fazenda);

    expect(fazendaCriada).toHaveProperty("id");
    expect(fazendaCriada).toHaveProperty("nomeFazenda");
    expect(fazendaCriada).toHaveProperty("cidade");
    expect(fazendaCriada).toHaveProperty("estado");
    expect(fazendaCriada).toHaveProperty("hectaresAgricultaveis");
    expect(fazendaCriada).toHaveProperty("hectaresVegetacao");
    expect(fazendaCriada).toHaveProperty("totalDeHectares");
    expect(fazendaCriada).toHaveProperty("ativo");
    expect(fazendaCriada).toHaveProperty("produtor");

    expect(fazendaCriada.ativo).toBeTruthy();
  });
});
