import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import BacLuong from './bac_luong.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ThongTinBhxh from './thong_tin_bhxh.js'

export default class NgachLuong extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'ma_ngach' })
  declare maNgach: string

  @column({ columnName: 'chuc_danh' })
  declare chucDanh: string

  @hasMany(() => BacLuong)
  declare bacLuong: HasMany<typeof BacLuong>

  @hasMany(() => ThongTinBhxh)
  declare thongTinBHXHs: HasMany<typeof ThongTinBhxh>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
