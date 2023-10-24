import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUserCitas1698167981850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users-citas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "appointment_id",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["appointment_id"],
                        referencedTableName: "appointments",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ],             
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users-citas");
    }

}

