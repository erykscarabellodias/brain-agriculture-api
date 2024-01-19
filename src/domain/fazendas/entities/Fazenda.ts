import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Produtor } from "../../produtores/entities/Produtor";

@Entity({ name: "fazendas" })
export default class Fazenda {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  nomeFazenda: string;

  @Column()
  estado: string;

  @Column()
  cidade: string;

  @Column()
  totalDeHectares: number;

  @Column()
  hectaresAgricultaveis: number;

  @Column()
  hectaresVegetacao: number;

  @Column()
  ativo: boolean;

  @ManyToOne(() => Produtor, (produtor) => produtor.fazendas)
  produtor: Produtor;
}
