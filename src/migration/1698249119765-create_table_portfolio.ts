import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTablePortfolio1698249119765 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "portfolio",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: "portfolio-name",
              type: "varchar",
            },
            {
              name: "tattoo-artist-id",
              type: "int",
              isUnique: true,
            },
          ],
          foreignKeys: [
            {
              columnNames: ["tattoo-artist-id"],
              referencedTableName: "tattoo-artists",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
            },
          ],
        }),
        true
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("portfolio");
    }
  }
