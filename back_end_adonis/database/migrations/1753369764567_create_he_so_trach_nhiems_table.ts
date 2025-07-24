import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'he_so_trach_nhiems'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('chuc_danh').notNullable()
      table.float('he_so').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
