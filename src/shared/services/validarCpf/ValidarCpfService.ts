import { AppError } from "../../erros/app.error";

export default class ValidarCpfService {
  private cpfComMascara: string;
  private novePrimeirosDigitos: string;
  private digitosVerificadores: string;

  public validar(cpf: string) {
    this.cpfComMascara = cpf;
    this.validarRegex();

    this.validarSeDigitosSaoIguais();

    this.separarNovePrimeirosDigitos();
    this.separarDigitosVerificadores();

    this.validarPrimeiroDigito();
    this.validarSegundoDigito();
  }

  private validarRegex(): void {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    if (!regex.test(this.cpfComMascara)) {
      throw new AppError(
        400,
        "Envie o CPF no formato 432.837.834-22, com os pontos e o traço"
      );
    }
  }

  private validarSeDigitosSaoIguais(): void {
    const cpfsComDigitosIguais: string[] = [
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
    ];

    if (cpfsComDigitosIguais.includes(this.cpfComMascara)) {
      throw new AppError(400, "CPF inválido");
    }
  }

  private separarNovePrimeirosDigitos() {
    const cpfSemPontos = this.cpfComMascara.replace(/[.]/g, "");

    this.novePrimeirosDigitos = cpfSemPontos.substring(0, 9);
  }

  private separarDigitosVerificadores() {
    const cpfDivididoPeloTraco = this.cpfComMascara.split("-");
    this.digitosVerificadores = cpfDivididoPeloTraco[1];
  }

  private validarPrimeiroDigito() {
    const multiplicacaoDosNovePrimeirosDigitos =
      this.realizarCalculoDeMultiplicaçãoDeNumeros(
        this.novePrimeirosDigitos,
        10
      );

    const restoDaDivisaoDeVerificacao =
      (multiplicacaoDosNovePrimeirosDigitos * 10) % 11;

    let digitoVerificador;

    if (restoDaDivisaoDeVerificacao == 10) {
      digitoVerificador = 0;
    } else {
      digitoVerificador = restoDaDivisaoDeVerificacao;
    }

    if (digitoVerificador.toString() !== this.digitosVerificadores[0]) {
      throw new AppError(400, "CPF inválido");
    }
  }

  private validarSegundoDigito() {
    const dezPrimeirosDigitos =
      this.novePrimeirosDigitos + this.digitosVerificadores.at(0);

    const multiplicacaoDosDezPrimeirosDigitos =
      this.realizarCalculoDeMultiplicaçãoDeNumeros(dezPrimeirosDigitos, 11);

    const restoDaDivisaoDeVerificacao =
      (multiplicacaoDosDezPrimeirosDigitos * 10) % 11;

    let digitoVerificador;

    if (restoDaDivisaoDeVerificacao == 10) {
      digitoVerificador = 0;
    } else {
      digitoVerificador = restoDaDivisaoDeVerificacao;
    }

    if (digitoVerificador.toString() !== this.digitosVerificadores[1]) {
      throw new AppError(400, "CPF inválido");
    }
  }

  realizarCalculoDeMultiplicaçãoDeNumeros(
    numerosParaMultiplicar: string,
    multiplicadorInicial: number
  ): number {
    let acumulador = 0;

    for (let i = 0; i < numerosParaMultiplicar.length; i++) {
      acumulador += parseInt(numerosParaMultiplicar[i]) * multiplicadorInicial;

      multiplicadorInicial--;
    }

    return acumulador;
  }
}
