import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import NhanVien from './nhan_vien.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ThongTinNghiViec extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nhanVienId: number
  @belongsTo(() => NhanVien)
  declare nhanVien: BelongsTo<typeof NhanVien>

  @column.date()
  declare thoiGianKetThuc: DateTime

  @column()
  declare thongTinKhac: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
