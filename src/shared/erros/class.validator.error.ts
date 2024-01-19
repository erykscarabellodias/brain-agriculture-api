import { ValidationError } from "class-validator";
import { AppError } from "./app.error";

export default class ClassValidatorError extends AppError {
  public errosDeValidacao: CampoComErro[] = new Array();

  constructor(erros: ValidationError[]) {
    super(
      400,
      "O(s) seguinte(s) problema(s) ocorreu(eram) com sua requisição:"
    );

    erros.map((err) => {
      this.errosDeValidacao.push({
        campo: err.property,
        erros: this.tratarErroParaArray(err),
      });
    });
  }

  private tratarErroParaArray(erroDeValidacao: ValidationError) {
    const constraints = erroDeValidacao.constraints;
    let mensagens: string[] = [];

    for (const erro in constraints) {
      mensagens.push(constraints[erro]);
    }

    return mensagens;
  }
}

interface CampoComErro {
  campo: string;
  erros: string[];
}
