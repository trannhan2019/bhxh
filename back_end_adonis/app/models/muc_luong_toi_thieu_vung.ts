import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MucLuongToiThieuVung extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mucLuong: number

  @column.dateTime()
  declare thoiGianApdung: DateTime

  @column()
  declare canCuPhapLy?: string

  // @hasMany(() => LichSuBHXH)
  // declare lichSuBHXHs: HasMany<typeof LichSuBHXH>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
