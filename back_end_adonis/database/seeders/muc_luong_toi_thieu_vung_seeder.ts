import { duLieuMucLuongToiThieu } from '#database/data/muc-luong-toi-thieu'
import MucLuongToiThieuVung from '#models/muc_luong_toi_thieu_vung'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await MucLuongToiThieuVung.createMany(duLieuMucLuongToiThieu)
  }
}
