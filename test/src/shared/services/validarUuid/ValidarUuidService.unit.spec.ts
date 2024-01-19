import { AppError } from "../../../../../src/shared/erros/app.error";
import ValidarUuidService from "../../../../../src/shared/services/validarUuid/ValidarUuidService";

describe("suíte de testes para a validação de uuids", () => {
  const validarUuidService = new ValidarUuidService();

  it("uuid inválido deve lançar exception", () => {
    expect(() => {
      validarUuidService.validar("teste");
    }).toThrow(new AppError(400, "O id enviado não é válido"));
  });

  it("uuid válido deve passar", () => {
    expect(() => {
      validarUuidService.validar("25b305c0-e03a-47dc-b350-60939c308b00");
    }).not.toThrow();
  });
});
