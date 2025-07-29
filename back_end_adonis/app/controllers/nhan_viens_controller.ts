import type { HttpContext } from '@adonisjs/core/http'

import NhanVien from '#models/nhan_vien'

export default class NhanViensController {
  index() {
    return NhanVien.query().preload('phong').preload('chucVu')
  }

  show({ params }: HttpContext) {
    return NhanVien.query().where('id', params.id).preload('phong').preload('chucVu').firstOrFail()
  }
}
