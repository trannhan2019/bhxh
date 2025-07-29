import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'thong_tin_nghi_viecs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('nhan_vien_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('nhan_viens')
        .onDelete('CASCADE')
      table.dateTime('thoi_gian_ket_thuc', { useTz: true }).notNullable()
      table.string('thong_tin_khac').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
