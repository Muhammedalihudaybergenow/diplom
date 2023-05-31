import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'images';
const productTableName = 'products';
export class CreateProductImageTable1685520671358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    isNullable: false,
                    isGenerated:true,
                    isPrimary:true
                },
                {
                    name: 'link',
                    type: 'varchar',
                    isNullable:false,
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
                    referencedTableName:productTableName
                }
            ]
        }),true,true,true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName,true,true,true);
    }

}
