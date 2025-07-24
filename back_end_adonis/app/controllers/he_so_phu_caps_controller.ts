// import type { HttpContext } from '@adonisjs/core/http'

import HeSoPhuCap from '#models/he_so_phu_cap'

export default class HeSoPhuCapsController {
  index() {
    return HeSoPhuCap.all()
  }
}
