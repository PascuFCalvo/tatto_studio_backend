import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTattooImages1698168899452
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },

          {
            name: "portfolio_id",
            type: "int",
          },
          {
            name: "image_name",
            type: "varchar",
          },
          {
            name: "image_url",
            type: "text",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["portfolio_id"],
            referencedTableName: "portfolio",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  }
}
