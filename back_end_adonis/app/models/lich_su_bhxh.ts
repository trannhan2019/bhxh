import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import NhanVien from './nhan_vien.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BacLuong from './bac_luong.js'
import HeSoPhuCap from './he_so_phu_cap.js'
import HeSoTrachNhiem from './he_so_trach_nhiem.js'
import MucLuongToiThieuVung from './muc_luong_toi_thieu_vung.js'

export default class LichSuBhxh extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nhanVienId: number
  @belongsTo(() => NhanVien)
  declare nhanVien: BelongsTo<typeof NhanVien>

  @column()
  declare bacLuongId: number
  @belongsTo(() => BacLuong)
  declare bacLuong: BelongsTo<typeof BacLuong>

  @column()
  declare phuCapId: number | null
  @belongsTo(() => HeSoPhuCap, { foreignKey: 'phuCapId' })
  declare phuCap: BelongsTo<typeof HeSoPhuCap>

  @column()
  declare trachNhiemId?: number | null
  @belongsTo(() => HeSoTrachNhiem, { foreignKey: 'trachNhiemId' })
  declare trachNhiem: BelongsTo<typeof HeSoTrachNhiem>

  @column()
  declare mucLuongToiThieuVungId: number
  @belongsTo(() => MucLuongToiThieuVung)
  declare mucLuongToiThieuVung: BelongsTo<typeof MucLuongToiThieuVung>

  @column.dateTime()
  declare ngayApDung: DateTime | null

  @column()
  declare thongTinQD: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
