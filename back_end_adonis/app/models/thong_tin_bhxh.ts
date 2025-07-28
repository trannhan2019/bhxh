import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import NhanVien from './nhan_vien.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import NgachLuong from './ngach_luong.js'
import BacLuong from './bac_luong.js'
import HeSoPhuCap from './he_so_phu_cap.js'
import HeSoTrachNhiem from './he_so_trach_nhiem.js'

export default class ThongTinBhxh extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nhanVienId: number
  @belongsTo(() => NhanVien)
  declare nhanVien: BelongsTo<typeof NhanVien>

  @column()
  declare ngachLuongId: number
  @belongsTo(() => NgachLuong)
  declare ngachLuong: BelongsTo<typeof NgachLuong>

  @column()
  declare bacLuongId: number
  @belongsTo(() => BacLuong)
  declare bacLuong: BelongsTo<typeof BacLuong>

  @column({ columnName: 'phu_cap_id' })
  declare phuCapId: number | null
  @belongsTo(() => HeSoPhuCap, { foreignKey: 'phuCapId' })
  declare phuCap: BelongsTo<typeof HeSoPhuCap>

  @column({ columnName: 'trach_nhiem_id' })
  declare trachNhiemId: number | null
  @belongsTo(() => HeSoTrachNhiem, { foreignKey: 'trachNhiemId' })
  declare trachNhiem: BelongsTo<typeof HeSoTrachNhiem>

  @column.dateTime()
  declare ngayApDung: DateTime

  @column()
  declare thongTin: string | null

  @column.dateTime()
  declare lastEmailSentAt: DateTime | null

  @column.dateTime()
  declare daNghiHuu: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
