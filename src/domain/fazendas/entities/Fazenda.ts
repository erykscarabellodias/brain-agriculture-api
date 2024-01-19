import { Column, Entity, PrimaryColumn } from "typeorm";

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
}
