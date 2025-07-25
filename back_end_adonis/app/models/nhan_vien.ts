import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Phong from './phong.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import ChucVu from './chuc_vu.js'
import ThongTinBhxh from './thong_tin_bhxh.js'

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

  @hasOne(() => ThongTinBhxh)
  declare thongTinBHXH: HasOne<typeof ThongTinBhxh>

  // @hasMany(() => LichSuBHXH)
  // declare lichSuBHXH: HasMany<typeof LichSuBHXH>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
