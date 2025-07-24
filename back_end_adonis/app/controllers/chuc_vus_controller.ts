// import type { HttpContext } from '@adonisjs/core/http'

import ChucVu from '#models/chuc_vu'

export default class ChucVusController {
  index() {
    return ChucVu.all()
  }
}
