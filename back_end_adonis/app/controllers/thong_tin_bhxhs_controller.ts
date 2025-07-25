import type { HttpContext } from '@adonisjs/core/http'

import ThongTinBhxh from '#models/thong_tin_bhxh'

export default class ThongTinBhxhsController {
  index() {
    return ThongTinBhxh.query()
      .preload('nhanVien', (nhanVienQuery) => {
        nhanVienQuery.preload('phong')
      })
      .preload('bacLuong')
      .preload('ngachLuong', (ngachLuongQuery) => {
        ngachLuongQuery.preload('bacLuong')
      })
      .preload('phuCap')
      .preload('trachNhiem')
  }

  async show({ params }: HttpContext) {
    const id = params.id
    return await ThongTinBhxh.query()
      .where('id', id)
      .preload('nhanVien', (nhanVienQuery) => {
        nhanVienQuery.preload('phong')
      })
      .preload('bacLuong')
      .preload('ngachLuong', (ngachLuongQuery) => {
        ngachLuongQuery.preload('bacLuong')
      })
      .preload('phuCap')
      .preload('trachNhiem')
      .firstOrFail()
  }
}
