import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableCitas1698166728949 implements MigrationInterface {

    
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
                  name: "client_name",
                  type: "varchar",
                  length: "255",
                },
                {
                  name: "tattoo_artist",
                  type: "varchar",
                  length: "255",
                },
                {
                  name: "type",
                  type: "enum",
                  enum: ["tattoo", "piercing"],
                  default: '"tattoo"',
                },
                {
                    name: "appointment_data",
                    type: "date", 
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
                  onUpdate:"CURRENT_TIMESTAMP",
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
