import { Column, Entity, PrimaryColumn } from "typeorm";

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
}
