import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarCnpjService from "../../../../../src/shared/services/validarCnpj/ValidarCnpjService";

describe("suite de testes da validação de CPF", () => {
  const service = new ValidarCnpjService();

  it("CNPJ não pode estar sem máscara", () => {
    const cnpjSemMascara = "26704086000127";

    expect(() => {
      service.validar(cnpjSemMascara);
    }).toThrow(
      new AppError(
        400,
        "Envie o CNPJ no formato 70.585.179/0001-71, com os pontos, a barra e o traço"
      )
    );
  });

  test.each([
    "26.704.086/0001-28",
    "76.190.781/0001-91",
    "30.085.441/0001-09",
    "09.250.261/0001-54",
    "41.881.418/0001-12",
    "05.290.837/0001-94",
    "17.315.249/0001-90",
    "67.508.638/0001-10",
    "13.581.438/0001-29",
    "62.000.482/0001-33",
  ])("CNPJ com dígitos verificadores inválidos não devem passar", (param) => {
    expect(() => service.validar(param)).toThrow(
      new AppError(400, "CNPJ inválido")
    );
  });

  test.each([
    "26.704.086/0001-27",
    "76.190.781/0001-96",
    "30.085.441/0001-02",
    "09.250.261/0001-34",
    "41.881.418/0001-32",
    "05.290.837/0001-36",
    "17.315.249/0001-99",
    "67.508.638/0001-09",
    "13.581.438/0001-52",
    "62.000.482/0001-37",
  ])("CNPJ válido com máscara deve passar", (param) => {
    expect(() => service.validar(param)).not.toThrow();
  });
});
