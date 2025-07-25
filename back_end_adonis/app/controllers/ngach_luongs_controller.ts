// import type { HttpContext } from '@adonisjs/core/http'

import NgachLuong from '#models/ngach_luong'

export default class NgachLuongsController {
  index() {
    return NgachLuong.all()
  }
  getNgachBacLuong() {
    return NgachLuong.query().preload('bacLuong')
  }
}
