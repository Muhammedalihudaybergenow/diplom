import { MigrationInterface, QueryRunner, Table } from "typeorm"

const tableName = 'images';
const productTableName = 'products';
const fileTableName = 'files';
export class CreateProductImageTable1685520671358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: tableName,
            columns: [
              {
                name: 'file_id',
                type: 'integer',
                isNullable: false,
              },
              {
                name: 'product_id',
                type: 'integer',
                isNullable: false,
              },
            ],
            foreignKeys: [
              {
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: productTableName,
              },
              {
                columnNames: ['file_id'],
                referencedColumnNames: ['id'],
                referencedTableName: fileTableName,
              },
            ],
          }),
          true,
          true,
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName,true,true,true);
    }

}
