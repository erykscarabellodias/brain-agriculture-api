import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoTabelaFazendasCulturas1705779876076
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "fazendas_culturas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "culturaId",
            type: "uuid",
          },
          {
            name: "fazendaId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk-fazendas-culturas-fazendas",
            columnNames: ["fazendaId"],
            referencedTableName: "fazendas",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "fk-fazendas-culturas-culturas",
            columnNames: ["culturaId"],
            referencedTableName: "culturas",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
