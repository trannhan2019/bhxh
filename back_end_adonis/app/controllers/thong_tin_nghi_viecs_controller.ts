// import type { HttpContext } from '@adonisjs/core/http'

import NhanVien from '#models/nhan_vien'
import ThongTinNghiViec from '#models/thong_tin_nghi_viec'

export default class ThongTinNghiViecsController {
  index() {
    return ThongTinNghiViec.query().preload('nhanVien', (nhanVienQuery) =>
      nhanVienQuery.whereNotNull('daNghiViec').preload('phong').preload('chucVu')
    )
  }
  async xacNhan({ params }: HttpContext) {
    const nhanVien = await NhanVien.findByOrFail('id', params.id)
    nhanVien.daNghiViec = await nhanVien.save() //value

    return ThongTinNghiViec.query().where('id', params.id).firstOrFail()
  }
}
