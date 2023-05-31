import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'products_descriptions';
const languageTableName = 'languages';
const productTableName = 'products';
export class CreateProductDescriptionTable1685519060064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    isNullable:false,
                    isGenerated:true,
                    isPrimary:true
                },
                {
                    name: 'product_id',
                    type: 'integer',
                    isNullable:false,
                },
                {
                    name: 'language_id',
                    type:'integer',
                    isNullable:false
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable:false
                }
            ],
            foreignKeys:[
                {
                    columnNames:['product_id'],
                    referencedColumnNames:['id'],
                    referencedTableName:productTableName
                },
                {
                    columnNames:['language_id'],
                    referencedColumnNames:['id'],
                    referencedTableName: languageTableName
                }
            ]
        }),true,true,true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(tableName,true,true,true);
    }

}
