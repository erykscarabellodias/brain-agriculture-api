import { NextFunction, Request, Response } from "express";
import ClassValidatorError from "../../shared/erros/class.validator.error";
import { AppError } from "../../shared/erros/app.error";

const capturaDeErros = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ClassValidatorError) {
    return response
      .status(error.statusHttp)
      .json({ mensagem: error.message, erros: error.errosDeValidacao });
  }

  if (error instanceof AppError) {
    return response.status(error.statusHttp).json({ mensagem: error.message });
  }

  if (error) {
    console.log(error);
    return response.status(500).json({
      message:
        "Houve um erro inesperado, tente novamente. Caso se o erro persista, entre em contato com o administrador",
    });
  }

  next(error);
};

export default capturaDeErros;
