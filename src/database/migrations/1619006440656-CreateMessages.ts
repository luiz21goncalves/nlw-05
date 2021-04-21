import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMessages1619006440656 implements MigrationInterface {
  private table = new Table({
    name: 'messages',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true
      },
      {
        name: 'admin_id',
        type: 'varchar',
        isNullable: true
      },
      {
        name: 'user_id',
        type: 'varchar',
        isNullable: true
      },
      {
        name: 'text',
        type: 'varchar'
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }
    ],
    foreignKeys: [{
      name: 'FKUserMessage',
      columnNames: ['user_id'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }]
  })

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
