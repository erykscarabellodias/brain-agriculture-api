import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Fazenda from "../../fazendas/entities/Fazenda";

@Entity({ name: "produtores" })
export class Produtor {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  nomeProdutor: string;

  @Column({ nullable: true, unique: true })
  cpf?: string;

  @Column({ nullable: true, unique: true })
  cnpj?: string;

  @Column()
  ativo: boolean;

  @OneToMany(() => Fazenda, (fazenda) => fazenda.produtor)
  fazendas: Fazenda[];
}
