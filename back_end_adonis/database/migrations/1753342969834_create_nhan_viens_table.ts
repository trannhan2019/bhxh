import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'nhan_viens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('ten', 255).notNullable() // ten String
      // Foreign key cho Phong
      table.integer('phong_id').unsigned().references('id').inTable('phongs').onDelete('CASCADE')
      // Foreign key cho ChucVu
      table
        .integer('chuc_vu_id')
        .unsigned()
        .references('id')
        .inTable('chuc_vus')
        .onDelete('CASCADE')

      table.integer('so_thu_tu').defaultTo(0).notNullable() // soThuTu Int @default(0)
      table.boolean('is_active').defaultTo(true).notNullable() // isActive Boolean @default(true)
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
