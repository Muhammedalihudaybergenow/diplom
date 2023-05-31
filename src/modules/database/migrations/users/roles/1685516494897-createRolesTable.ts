import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'roles'
export class CreateRolesTable1685516494897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary:true,
                    isGenerated:true,
                    isNullable:false
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable:false,
                    isUnique:true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(tableName)
    }

}
