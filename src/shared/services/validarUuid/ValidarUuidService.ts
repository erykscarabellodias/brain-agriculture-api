import { validate } from "uuid";
import { AppError } from "../../erros/app.error";

export default class ValidarUuidService {
  public validar(uuid: string): void {
    if (!validate(uuid)) {
      throw new AppError(400, "O id enviado não é válido");
    }
  }
}
