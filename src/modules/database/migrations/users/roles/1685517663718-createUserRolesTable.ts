import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName ='users_roles';
const userTableName ='users';
const roleTableName ='roles';
export class CreateUserRolesTable1685517663718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns:[
                {
                    name: 'user_id',
                    type: 'integer',
                    isNullable:false
                },
                {
                    name: 'role_id',
                    type: 'integer',
                    isNullable:false
                }
            ],
            foreignKeys:[
                {
                    columnNames:['user_id'],
                    referencedColumnNames:['id'],
                    referencedTableName: userTableName
                },
                {
                    columnNames:['role_id'],
                    referencedColumnNames:['id'],
                    referencedTableName: roleTableName
                }
            ],
            uniques:[
                {
                    columnNames: ['user_id','role_id']
                }
            ]
        }),true,true,true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(tableName,true,true,true);
    }

}
