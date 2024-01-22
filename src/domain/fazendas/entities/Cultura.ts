import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import Fazenda from "./Fazenda";

@Entity({ name: "culturas" })
export default class Cultura {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  tipo: string;

  @ManyToMany(() => Fazenda, (fazenda) => fazenda.culturas)
  fazendas: Fazenda[];
}
