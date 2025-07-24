import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'phongs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      // ten String
      table.string('ten').notNullable()
      // tenVietTat String
      table.string('ten_viet_tat').notNullable()

      // soThuTu Int @default(0)
      table.integer('so_thu_tu').notNullable().defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
