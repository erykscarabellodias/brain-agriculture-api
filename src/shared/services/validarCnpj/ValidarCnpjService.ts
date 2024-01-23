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
        "Envie o CNPJ no formato 70.585.179/0001-71, com os pontos, a barra e o traço"
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

    const multiplicacaoDosDozePrimeirosDigitos =
      this.realizarCalculoDeMultiplicaçãoDeNumeros(
        dozePrimeirosDigitosInvertidos,
        2
      );

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

    const multiplicacaoDosTrezePrimeirosDigitos =
      this.realizarCalculoDeMultiplicaçãoDeNumeros(
        trezePrimeirosDigitosInvertidos,
        2
      );

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

  realizarCalculoDeMultiplicaçãoDeNumeros(
    numerosParaMultiplicar: string,
    multiplicadorInicial: number
  ): number {
    let acumulador = 0;

    for (let i = 0; i < numerosParaMultiplicar.length; i++) {
      acumulador += parseInt(numerosParaMultiplicar[i]) * multiplicadorInicial;

      if (multiplicadorInicial === 9) {
        multiplicadorInicial = 2;
      } else {
        multiplicadorInicial++;
      }
    }

    return acumulador;
  }
}
