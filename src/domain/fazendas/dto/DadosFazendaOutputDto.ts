import { Produtor } from "../../produtores/entities/Produtor";
import Fazenda from "../entities/Fazenda";

export default class DadosFazendaOutputDto {
  public id: string;
  public nomeFazenda: string;
  public cidade: string;
  public estado: string;
  public hectaresAgricultaveis: number;
  public hectaresVegetacao: number;
  public totalDeHectares: number;
  public deletedAt: Date | null;
  public produtor: Produtor;

  constructor(fazenda: Fazenda) {
    this.id = fazenda.id;
    this.nomeFazenda = fazenda.nomeFazenda;
    this.cidade = fazenda.cidade;
    this.estado = fazenda.estado;
    this.hectaresAgricultaveis = fazenda.hectaresAgricultaveis;
    this.hectaresVegetacao = fazenda.hectaresVegetacao;
    this.totalDeHectares = fazenda.totalDeHectares;
    this.deletedAt = null;

    this.produtor = new Produtor();
    this.produtor.id = fazenda.produtor.id;
    this.produtor.nomeProdutor = fazenda.produtor.nomeProdutor;
    this.produtor.cpf = fazenda.produtor.cpf;
    this.produtor.cnpj = fazenda.produtor.cnpj;
    this.produtor.deletedAt = fazenda.produtor.deletedAt;
  }
}
