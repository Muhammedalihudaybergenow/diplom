import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'order_items'
export class CreateOrderItemTable1686218010219 implements MigrationInterface {

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
                    name: 'amount',
                    type: 'integer',
                    isNullable:false
                },
                {
                    name: 'price',
                    type: 'integer',
                    isNullable:false
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable:false
                },
                {
                    name:'order_id',
                    type: 'integer',
                    isNullable:false
                },
                {
                    name: 'product_id',
                    type: 'integer',
                    isNullable:false
                }
            ],
            foreignKeys:[
                {
                    columnNames:['product_id'],
                    referencedColumnNames:['id'],
                    referencedTableName:'products'
                },
                {
                    columnNames:['order_id'],
                    referencedColumnNames:['id'],
                    referencedTableName: 'orders'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
