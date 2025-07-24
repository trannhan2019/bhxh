import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class HeSoTrachNhiem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare chucDanh: string

  @column()
  declare heSo: number

  // @hasMany(() => ThongTinBHXH)
  // declare thongtinBHXHs: HasMany<typeof ThongTinBHXH>

  // @hasMany(() => LichSuBHXH)
  // declare lichSuBHXHs: HasMany<typeof LichSuBHXH>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
