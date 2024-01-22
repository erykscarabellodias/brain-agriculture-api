import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Produtor } from "../../produtores/entities/Produtor";
import Cultura from "./Cultura";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

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

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @ManyToOne(() => Produtor, (produtor) => produtor.fazendas)
  produtor: Produtor;

  @ManyToMany(() => Cultura, (cultura) => cultura.fazendas)
  @JoinTable({
    name: "fazendas_culturas",
    joinColumn: { name: "fazendaId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "culturaId", referencedColumnName: "id" },
  })
  culturas: Cultura[];
}
