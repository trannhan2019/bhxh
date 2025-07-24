// import type { HttpContext } from '@adonisjs/core/http'

import MucLuongToiThieuVung from '#models/muc_luong_toi_thieu_vung'

export default class MucLuongToiThieuVungsController {
  index() {
    return MucLuongToiThieuVung.all()
  }
}
