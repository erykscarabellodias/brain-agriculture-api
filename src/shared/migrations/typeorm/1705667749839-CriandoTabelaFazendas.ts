import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriandoTabelaFazendas1705667749839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "fazendas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nomeFazenda",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cidade",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "estado",
            type: "varchar",
            length: "2",
            isNullable: false,
          },
          {
            name: "totalDeHectares",
            type: "int",
            isNullable: false,
          },
          {
            name: "hectaresAgricultaveis",
            type: "int",
            isNullable: false,
          },
          {
            name: "hectaresVegetacao",
            type: "int",
            isNullable: false,
          },
          {
            name: "ativo",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "produtorId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk-produtores-fazendas",
            columnNames: ["produtorId"],
            referencedTableName: "produtores",
            referencedColumnNames: ["id"],
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
