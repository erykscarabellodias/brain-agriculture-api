import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "culturas" })
export default class Cultura {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  tipo: string;
}
