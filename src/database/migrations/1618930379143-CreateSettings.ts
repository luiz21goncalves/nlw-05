import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSettings1618930379143 implements MigrationInterface {
  private table = new Table({
    name: 'settings',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true
      },
      {
        name: 'username',
        type: 'varchar'
      },
      {
        name: 'chat',
        type: 'boolean',
        default: true
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
    ]
  })

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
