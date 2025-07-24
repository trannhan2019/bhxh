import { duLieuHeSoTrachNhiem } from '#database/data/he-so-trach-nhiem'
import HeSoTrachNhiem from '#models/he_so_trach_nhiem'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await HeSoTrachNhiem.createMany(duLieuHeSoTrachNhiem)
  }
}
