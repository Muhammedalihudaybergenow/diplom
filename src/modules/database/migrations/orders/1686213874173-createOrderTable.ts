import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'orders';
export class CreateOrderTable1686213874173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: tableName,
        columns:[
            {
                name: 'id',
                type: 'integer',
                isNullable:false,
                isGenerated:true,
                isPrimary:true,
                isUnique:true
            },
            {
                name: 'order_no',
                type: 'varchar',
                isNullable:false,
                isUnique:true
            },
            {
                name: 'status',
                type: 'varchar',
                length: '20',
                isNullable:false
            },
            {
                name: 'created_at',
                type: 'bigint',
                isNullable:false
            },
            {
                name: 'updated_at',
                type: 'bigint',
                isNullable:false
            },
            {
                name: 'user_id',
                type:'integer',
                isNullable:false
            }
        ],
        foreignKeys:[
            {
                columnNames:['user_id'],
                referencedColumnNames:['id'],
                referencedTableName:'users'
            }
        ]
    }),true,true,true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(tableName,true,true,true)
    }

}
