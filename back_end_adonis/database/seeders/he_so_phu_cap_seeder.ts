import { duLieuHeSoPhuCap } from '#database/data/he-so-phu-cap'
import HeSoPhuCap from '#models/he_so_phu_cap'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await HeSoPhuCap.createMany(duLieuHeSoPhuCap)
  }
}
