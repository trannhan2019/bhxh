import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'thong_tin_bhxhs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('nhan_vien_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('nhan_viens')
        .onDelete('CASCADE')
      table
        .integer('ngach_luong_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ngach_luongs')
        .onDelete('CASCADE')
      table
        .integer('bac_luong_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bac_luongs')
        .onDelete('CASCADE')
      table
        .integer('phu_cap_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('he_so_phu_caps')
        .onDelete('SET NULL')
      table
        .integer('trach_nhiem_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('he_so_trach_nhiems')
        .onDelete('SET NULL')
      table.dateTime('ngay_ap_dung').notNullable()
      table.string('thong_tin').nullable()
      table.dateTime('last_email_sent_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
