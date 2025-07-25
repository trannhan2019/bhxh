import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import NgachLuong from './ngach_luong.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ThongTinBhxh from './thong_tin_bhxh.js'

export default class BacLuong extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bac: number

  @column()
  declare heSo: number

  @column()
  declare thoiGianNangBac: number

  @column()
  declare ngachLuongId: number

  @belongsTo(() => NgachLuong)
  declare ngachLuong: BelongsTo<typeof NgachLuong>

  @hasMany(() => ThongTinBhxh)
  declare thongTinBHXHs: HasMany<typeof ThongTinBhxh>

  // @hasMany(() => LichSuBHXH)
  // declare lichSuBHXHs: HasMany<typeof LichSuBHXH>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
