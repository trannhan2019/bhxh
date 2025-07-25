// import type { HttpContext } from '@adonisjs/core/http'

import BacLuong from '#models/bac_luong'

export default class BacLuongsController {
  index() {
    // return BacLuong.query().preload('ngach')
    return BacLuong.all()
  }
}
