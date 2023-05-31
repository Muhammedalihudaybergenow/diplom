import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'products_names';
const languageTableName = 'languages';
const productTableName = 'products';
export class CreateProductNameTable1685518698248 implements MigrationInterface {

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
                    name: 'name',
                    type: 'varchar',
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
