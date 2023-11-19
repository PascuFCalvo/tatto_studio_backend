import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTattooArtists1698248971658 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "tattoo-artists",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {name: "user_id",
              type: "int"

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
                isUnique: true,
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
                enum: ["tattoo", "admin", "black_alien"],
                default: '"tattoo"',
              },
              {
                name: "licenseNumber",
                type: "varchar",
                length: "255",
              },
              {
                name: "formation",
                type: "varchar",
                length: "255",
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
              
            ]
            ,
            foreignKeys: [
              {
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
              },
            ]
            
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tattoo-artists");
      }
    }