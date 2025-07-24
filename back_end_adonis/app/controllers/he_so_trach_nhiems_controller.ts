// import type { HttpContext } from '@adonisjs/core/http'

import HeSoTrachNhiem from '#models/he_so_trach_nhiem'

export default class HeSoTrachNhiemsController {
  index() {
    return HeSoTrachNhiem.all()
  }
}
