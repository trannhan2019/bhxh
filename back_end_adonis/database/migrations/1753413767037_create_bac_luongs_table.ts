import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bac_luongs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('bac').notNullable()
      table.float('he_so').notNullable()
      table.integer('thoi_gian_nang_bac').notNullable()
      table
        .integer('ngach_luong_id')
        .unsigned()
        .references('id')
        .inTable('ngach_luongs')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
