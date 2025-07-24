import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Phong extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ten: string

  @column()
  declare tenVietTat: string

  @column()
  declare soThuTu: number

  // Định nghĩa mối quan hệ một-nhiều: Một phòng có nhiều nhân viên
  // @hasMany(() => NhanVien)
  // public nhanVien: HasMany<typeof NhanVien>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
