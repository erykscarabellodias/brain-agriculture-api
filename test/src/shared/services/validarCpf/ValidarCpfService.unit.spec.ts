import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarCpfService from "../../../../../src/shared/services/validarCpf/ValidarCpfService";

describe("suite de testes da validação de CPF", () => {
  const service = new ValidarCpfService();

  it("CPF não pode estar sem máscara", () => {
    const cpfSemMascara = "31431032050";

    expect(() => {
      service.validar(cpfSemMascara);
    }).toThrow(
      new AppError(
        400,
        "Envie o CPF no formato 432.837.834-22, com os pontos e o traço"
      )
    );
  });

  test.each([
    "000.000.000-00",
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33",
    "444.444.444-44",
    "555.555.555-55",
    "666.666.666-66",
    "777.777.777-77",
    "888.888.888-88",
    "999.999.999-99",
  ])("CPF com dígitos iguais não devem passar", (param) => {
    expect(() => service.validar(param)).toThrow(
      new AppError(400, "CPF inválido")
    );
  });

  test.each([
    "314.310.320-40",
    "943.937.510-85",
    "472.501.320-07",
    "583.259.000-05",
    "721.980.910-76",
    "055.192.790-91",
    "519.094.620-61",
    "644.868.520-31",
    "927.975.110-88",
    "606.493.560-94",
  ])("CPF com dígitos inválidos não devem passar", (param) => {
    expect(() => service.validar(param)).toThrow(
      new AppError(400, "CPF inválido")
    );
  });

  test.each([
    "314.310.320-50",
    "943.937.510-86",
    "472.501.320-08",
    "583.259.000-75",
    "721.980.910-70",
    "055.192.790-98",
    "519.094.620-71",
    "644.868.520-01",
    "927.975.110-77",
    "606.493.560-04",
  ])("CPF válido com máscara deve passar", (param) => {
    expect(() => service.validar(param)).not.toThrow();
  });
});
