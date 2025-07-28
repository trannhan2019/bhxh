import type { HttpContext } from '@adonisjs/core/http'

import LichSuBhxh from '#models/lich_su_bhxh'

export default class LichSuBhxhsController {
  async getByNhanVien({ params }: HttpContext) {
    const id = params.id
    return await LichSuBhxh.query()
      .where('nhanVienId', id)
      .preload('nhanVien')
      .preload('bacLuong', (query) => query.preload('ngachLuong'))
      .preload('phuCap')
      .preload('trachNhiem')
      .preload('mucLuongToiThieuVung')
      .orderBy('ngayApDung', 'desc')
  }
}
