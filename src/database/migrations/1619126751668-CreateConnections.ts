import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateConnections1619126751668 implements MigrationInterface {
  private table = new Table({
    name: 'connections',
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
        name: 'socket_id',
        type: 'varchar'
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }
    ],
    foreignKeys: [{
      name: 'FKUserConnetion',
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
