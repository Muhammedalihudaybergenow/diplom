import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'products';
const categoriesTableName = 'categories';
const brandsTableName = 'brands';
export class CreateProductTable1685109478844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isNullable: false,
            isGenerated: true,
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'brand_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'category_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'integer',
            isNullable:false
          },
          {
            name: 'price',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['brand_id'],
            referencedColumnNames: ['id'],
            referencedTableName: brandsTableName,
          },
          {
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: categoriesTableName,
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
