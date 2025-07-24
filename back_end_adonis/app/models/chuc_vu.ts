import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import NhanVien from './nhan_vien.js'

export default class ChucVu extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ten: string

  @column()
  declare tenVietTat: string

  @hasMany(() => NhanVien)
  declare nhanVien: HasMany<typeof NhanVien>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
