import { chucvuData } from '#database/data/chuc-vu'
import ChucVu from '#models/chuc_vu'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await ChucVu.createMany(chucvuData)
  }
}
