import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'permissions';
export class CreatePermissionTable1685517235670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    isNullable:false,
                    isUnique:true,
                    isPrimary:true,
                    isGenerated:true
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
