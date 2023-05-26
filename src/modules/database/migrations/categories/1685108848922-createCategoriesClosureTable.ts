import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'categories_closure';
const categoriesTableName = 'categories';
export class CreateCategoriesClosureTable1685108848922
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'ancestor_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'descendant_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['ancestor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: categoriesTableName,
          },
          {
            columnNames: ['descendant_id'],
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
