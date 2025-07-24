import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Phong from './phong.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ChucVu from './chuc_vu.js'

export default class NhanVien extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ten: string

  @column()
  declare phongId: number

  @belongsTo(() => Phong)
  declare phong: BelongsTo<typeof Phong>

  @column()
  declare chucVuId: number

  @belongsTo(() => ChucVu)
  declare chucVu: BelongsTo<typeof ChucVu>

  @column()
  declare soThuTu: number

  @column()
  declare isActive: boolean

  // @hasOne(() => ThongTinBHXH)
  // declare thongTinBHXH: HasOne<typeof ThongTinBHXH>

  // @hasMany(() => LichSuBHXH)
  // declare lichSuBHXH: HasMany<typeof LichSuBHXH>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
