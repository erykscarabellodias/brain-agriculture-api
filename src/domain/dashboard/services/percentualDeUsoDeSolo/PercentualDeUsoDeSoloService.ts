import FazendaRepository from "../../../fazendas/repositories/FazendaRepository";
import PercentualDeUsoDeSoloOutputDto from "./PercentualDeUsoDeSoloOutputDto";

export default class PercentualDeUsoDeSoloService {
  constructor(private readonly repository: FazendaRepository) {}

  async calcular(): Promise<PercentualDeUsoDeSoloOutputDto> {
    const { soma: areaTotal } = await this.repository.areaTotalDeFazendas();

    const { areaAgricultavelTotal } =
      await this.repository.areaAgricultavelTotal();

    const { areaDeVegetacaoTotal } =
      await this.repository.areaDeVegetacaoTotal();

    const areaAgricultavelEmPercentual =
      (parseInt(areaAgricultavelTotal) / parseInt(areaTotal)) * 100;

    const areaDeVegetacaoEmPercentual =
      (parseInt(areaDeVegetacaoTotal) / parseInt(areaTotal)) * 100;

    const areaTotalDeclarada =
      parseInt(areaAgricultavelTotal) + parseInt(areaDeVegetacaoTotal);

    const areaNaoDeclaradaEmPercentual =
      ((areaTotal - areaTotalDeclarada) / parseInt(areaTotal)) * 100;

    const usoPercentualDeSolo: PercentualDeUsoDeSoloOutputDto = {
      areaAgricultavelEmPercentual: this.arredondarPercentual(
        areaAgricultavelEmPercentual
      ),
      areaDeVegetacaoEmPercentual: this.arredondarPercentual(
        areaDeVegetacaoEmPercentual
      ),
      areaNaoDeclaradaEmPercentual: this.arredondarPercentual(
        areaNaoDeclaradaEmPercentual
      ),
    };

    return usoPercentualDeSolo;
  }

  private arredondarPercentual(valor: number): string {
    return valor ? valor.toFixed(2) : "0";
  }
}
