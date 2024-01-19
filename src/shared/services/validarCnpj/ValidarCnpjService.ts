import { AppError } from "../../erros/app.error";

export default class ValidarCnpjService {
  private cnpjComMascara: string;
  private dozePrimeirosDigitos: string;
  private digitosVerificadores: string;

  public validar(cnpj: string) {
    this.cnpjComMascara = cnpj;
    this.validarRegex();

    this.separarDozePrimeirosDigitos();
    this.separarDigitosVerificadores();

    this.validarPrimeiroDigito();
    this.validarSegundoDigito();
  }

  private validarRegex(): void {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

    if (!regex.test(this.cnpjComMascara)) {
      throw new AppError(
        400,
        "Envie o CNPJ no formato 70.585.179/0001-71, com os pontos e o traço"
      );
    }
  }

  private separarDozePrimeirosDigitos() {
    const cpfSemPontos = this.cnpjComMascara.replace(/[./]/g, "");

    this.dozePrimeirosDigitos = cpfSemPontos.substring(0, 12);
  }

  private separarDigitosVerificadores() {
    const cnpjDivididoPeloTraco = this.cnpjComMascara.split("-");
    this.digitosVerificadores = cnpjDivididoPeloTraco[1];
  }

  private validarPrimeiroDigito() {
    const dozePrimeirosDigitosInvertidos = this.dozePrimeirosDigitos
      .split("")
      .reverse()
      .join("");

    let multiplicacaoDosDozePrimeirosDigitos = 0;
    let multiplicador = 2;

    for (let i = 0; i < dozePrimeirosDigitosInvertidos.length; i++) {
      multiplicacaoDosDozePrimeirosDigitos +=
        parseInt(dozePrimeirosDigitosInvertidos[i]) * multiplicador;

      if (multiplicador === 9) {
        multiplicador = 2;
      } else {
        multiplicador++;
      }
    }

    const restoDaDivisaoPorOnze = multiplicacaoDosDozePrimeirosDigitos % 11;

    let digitoVerificador;

    if (restoDaDivisaoPorOnze <= 1) {
      digitoVerificador = 0;
    } else {
      digitoVerificador = 11 - restoDaDivisaoPorOnze;
    }

    if (digitoVerificador.toString() != this.digitosVerificadores[0]) {
      throw new AppError(400, "CNPJ inválido");
    }
  }

  private validarSegundoDigito() {
    const trezePrimeirosDigitos =
      this.dozePrimeirosDigitos + this.digitosVerificadores[0];

    const trezePrimeirosDigitosInvertidos = trezePrimeirosDigitos
      .split("")
      .reverse()
      .join("");

    let multiplicacaoDosTrezePrimeirosDigitos = 0;
    let multiplicador = 2;

    for (let i = 0; i < trezePrimeirosDigitosInvertidos.length; i++) {
      multiplicacaoDosTrezePrimeirosDigitos +=
        parseInt(trezePrimeirosDigitosInvertidos[i]) * multiplicador;

      if (multiplicador === 9) {
        multiplicador = 2;
      } else {
        multiplicador++;
      }
    }

    const restoDaDivisaoPorOnze = multiplicacaoDosTrezePrimeirosDigitos % 11;

    let digitoVerificador;

    if (restoDaDivisaoPorOnze <= 1) {
      digitoVerificador = 0;
    } else {
      digitoVerificador = 11 - restoDaDivisaoPorOnze;
    }

    if (digitoVerificador.toString() != this.digitosVerificadores[1]) {
      throw new AppError(400, "CNPJ inválido");
    }
  }
}
