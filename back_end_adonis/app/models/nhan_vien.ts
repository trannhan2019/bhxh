import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Phong from './phong.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import ChucVu from './chuc_vu.js'
import ThongTinBhxh from './thong_tin_bhxh.js'
import LichSuBhxh from './lich_su_bhxh.js'

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

  @column.dateTime()
  declare daNghiViec: DateTime | null

  @hasOne(() => ThongTinBhxh)
  declare thongTinBHXH: HasOne<typeof ThongTinBhxh>

  @hasMany(() => LichSuBhxh)
  declare lichSuBHXH: HasMany<typeof LichSuBhxh>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
