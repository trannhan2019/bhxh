// import type { HttpContext } from '@adonisjs/core/http'

import MucLuongToiThieuVung from '#models/muc_luong_toi_thieu_vung'

export default class MucLuongToiThieuVungsController {
  index() {
    return MucLuongToiThieuVung.query().orderBy('thoiGianApdung', 'desc')
  }

  getMucLuongMoiNhat() {
    return MucLuongToiThieuVung.query().orderBy('thoiGianApdung', 'desc').first()
  }
}
