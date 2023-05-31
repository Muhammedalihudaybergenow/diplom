import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'languages';

export class CreateLanguageTable1685518417764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    isNullable:false,
                    isPrimary:true,
                    isGenerated:true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length:'20',
                    isNullable:false,
                    isUnique:true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(tableName,true,true,true);
    }

}
