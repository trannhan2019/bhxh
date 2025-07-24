// import type { HttpContext } from '@adonisjs/core/http'

import Phong from '#models/phong'

export default class PhongsController {
  index() {
    return Phong.all()
  }
}
