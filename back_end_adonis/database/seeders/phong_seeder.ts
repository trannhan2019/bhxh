import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Phong from '#models/phong'
import { phongData } from '#database/data/phong'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Phong.createMany(phongData)
  }
}
