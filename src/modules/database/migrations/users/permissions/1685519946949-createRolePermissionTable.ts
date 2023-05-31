import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'roles_permissions';
const roleTableName = 'roles';
const permissionTableName = 'permissions';
export class CreateRolePermissionTable1685519946949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns:[
                {
                    name: 'role_id',
                    type: 'integer',
                    isNullable:false
                },
                {
                    name:'permission_id',
                    type: 'integer',
                    isNullable:false
                }
            ],
            foreignKeys:[
                {
                    columnNames: ['role_id'],
                    referencedColumnNames:['id'],
                    referencedTableName: roleTableName
                },
                {
                    columnNames:['permission_id'],
                    referencedColumnNames:['id'],
                    referencedTableName: permissionTableName
                }
            ],
            uniques:[
                {
                    columnNames:['role_id','permission_id']
                }
            ]
        }),true,true,true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(tableName,true,true,true);
    }

}
