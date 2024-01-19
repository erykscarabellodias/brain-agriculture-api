import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class SubstituindoCampoAtivoPorDeletedAt1705705784810
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("produtores", "ativo");

    await queryRunner.dropColumn("fazendas", "ativo");

    await queryRunner.addColumn(
      "produtores",
      new TableColumn({
        name: "deletedAt",
        type: "timestamp",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "fazendas",
      new TableColumn({
        name: "deletedAt",
        type: "timestamp",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
