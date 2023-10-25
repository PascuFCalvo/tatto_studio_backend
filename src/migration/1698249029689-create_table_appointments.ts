import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableAppointments1698249029689 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "appointments",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: "title",
              type: "varchar",
              length: "255",
            },
            {
              name: "description",
              type: "varchar",
              length: "255",
            },
  
            {
              name: "tattoo_artist",
              type: "int",
            },
  
            {
              name: "client",
              type: "int",
            }
            ,
            {
              name: "type",
              type: "enum",
              enum: ["tattoo", "piercing", "other"],
              default: '"tattoo"',
            },
            {
              name: "appointment_data",
              type: "date",
            },
            {
              name: "appointment_turn",
              type: "enum",
              enum: ["morning", "evening"],
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "CURRENT_TIMESTAMP",
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "CURRENT_TIMESTAMP",
              onUpdate: "CURRENT_TIMESTAMP",
            },
          ],
          foreignKeys: [
            {
              columnNames: ["tattoo_artist"],
              referencedTableName: "tattoo-artists",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
            },
            {
              columnNames: ["client"],
              referencedTableName: "users",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
            },
          ],
        }),
        true
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("appointments");
    }
  }
  