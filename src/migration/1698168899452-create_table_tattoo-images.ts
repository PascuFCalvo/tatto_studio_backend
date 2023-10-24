import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTattooImages1698168899452 implements MigrationInterface {
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
                        name: "image_name",
                        type: "varchar"
                    },
                    {
                        name: "portfolio_id",
                        type: "int",
                        
                    }
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


