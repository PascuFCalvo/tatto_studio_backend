import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUsers1698248906793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "users",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "user_name",
                type: "varchar",
                length: "255",
              },
              {
                name: "email",
                type: "varchar",
                length: "255",
                isUnique: true
              },
              {
                name: "password",
                type: "varchar",
                length: "255",
              },
              {
                name: "phone",
                type: "varchar",
                length: "255",
              },
              {
                name: "level",
                type: "enum",
                enum: ["user", "tattoo", "admin", "black_alien"],
                default: '"user"',
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
        await queryRunner.dropTable("users");
      }
    }