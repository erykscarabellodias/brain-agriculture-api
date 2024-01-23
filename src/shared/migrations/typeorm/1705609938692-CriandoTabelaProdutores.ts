import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoTabelaProdutores1705609938692
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase("brain-agriculture-app");

    await queryRunner.createTable(
      new Table({
        name: "produtores",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nomeProdutor",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cpf",
            isUnique: true,
            type: "varchar",
            length: "14",
            isNullable: true,
          },
          {
            name: "cnpj",
            isUnique: true,
            type: "varchar",
            length: "18",
            isNullable: true,
          },
          {
            name: "ativo",
            type: "boolean",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
