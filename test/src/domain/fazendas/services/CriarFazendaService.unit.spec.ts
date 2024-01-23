import FazendaRepository from "../../../../../src/domain/fazendas/repositories/FazendaRepository";
import CriarFazendaService from "../../../../../src/domain/fazendas/services/criarFazenda/CriarFazendaService";
import DadosFazendaInputDto from "../../../../../src/domain/fazendas/dto/DadosFazendaInputDto";
import ProdutorRepository from "../../../../../src/domain/produtores/repositories/ProdutorRepository";
import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";
import {
  produtorMock,
  produtorNaoEncontradoMock,
} from "../../../../mocks/produtor/produtoresMock";
import ClassValidatorError from "../../../../../src/shared/erros/class.validator.error";
import {
  fazendaMock,
  fazendaNaoEncontradaMock,
} from "../../../../mocks/fazenda/fazendasMock";
import BuscarCepServiceViaCep from "../../../../../src/shared/services/buscarCep/BuscarCepViaCepService";
import { cepEncontrado } from "../../../../mocks/cep/cepMock";

describe("suite de testes da criação de fazendas", () => {
  const fazendaRepository = new FazendaRepository();
  const produtorRepository = new ProdutorRepository();
  const validarUuidService = new ValidarUuidService();
  const buscarCepService = new BuscarCepServiceViaCep();

  const criarFazendaService = new CriarFazendaService(
    fazendaRepository,
    produtorRepository,
    validarUuidService,
    buscarCepService
  );

  it("não deve ser possível criar uma fazenda para um produtor que não existe", async () => {
    buscarCepService.buscar = cepEncontrado;
    produtorRepository.buscarPorId = produtorNaoEncontradoMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cep: "13890000",
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
    produtorRepository.buscarPorId = produtorMock;

    const idProdutor = "25b305c0-e03a-47dc-b350-60939c308b00";

    expect(async () => {
      await criarFazendaService.criar(idProdutor, param);
    }).rejects.toThrow(ClassValidatorError);
  });

  it("soma da área agricultável e da área de vegetação não pode ser maior que a área total", async () => {
    buscarCepService.buscar = cepEncontrado;
    produtorRepository.buscarPorId = produtorMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstado =
      fazendaNaoEncontradaMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cep: "13890000",
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
    buscarCepService.buscar = cepEncontrado;
    produtorRepository.buscarPorId = produtorMock;
    fazendaRepository.buscarPorProdutorNomeFazendaCidadeEEstado =
      fazendaNaoEncontradaMock;
    fazendaRepository.criar = fazendaMock;

    const fazenda: DadosFazendaInputDto = {
      nomeFazenda: "Fazenda Aliança",
      cep: "13890000",
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
    expect(fazendaCriada).toHaveProperty("deletedAt");
    expect(fazendaCriada).toHaveProperty("produtor");

    expect(fazendaCriada.deletedAt).toBeNull();
  });
});
