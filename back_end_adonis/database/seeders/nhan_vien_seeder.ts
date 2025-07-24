import { nhanVienData } from '#database/data/nhan-vien'
import NhanVien from '#models/nhan_vien'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await NhanVien.createMany(nhanVienData)
  }
}
