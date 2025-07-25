import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ThongTinBhxh from './thong_tin_bhxh.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class HeSoTrachNhiem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare chucDanh: string

  @column()
  declare heSo: number

  @hasMany(() => ThongTinBhxh)
  declare thongtinBHXHs: HasMany<typeof ThongTinBhxh>

  // @hasMany(() => LichSuBHXH)
  // declare lichSuBHXHs: HasMany<typeof LichSuBHXH>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
