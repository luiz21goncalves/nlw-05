import { createConnection } from 'typeorm'
import { v4 as uuid } from 'uuid'

async function seed () {
  try {
    const connection = await createConnection()

    await connection.runMigrations()

    await connection.query(`
      INSERT INTO settings(id, username, created_at, updated_at)
      VALUES ('${uuid()}', 'admin', '${new Date().toISOString()}', '${new Date().toISOString()}')
    `)
  } catch (err) {
    console.error(err)
  }
}

seed()
