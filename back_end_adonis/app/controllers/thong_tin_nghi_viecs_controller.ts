import type { HttpContext } from '@adonisjs/core/http'

import NhanVien from '#models/nhan_vien'
import ThongTinNghiViec from '#models/thong_tin_nghi_viec'
import { DateTime } from 'luxon'

export default class ThongTinNghiViecsController {
  index() {
    return ThongTinNghiViec.query().preload('nhanVien', (nhanVienQuery) =>
      nhanVienQuery.preload('phong').preload('chucVu')
    )
  }
  async xacNhan({ params, request }: HttpContext) {
    const nhanVien = await NhanVien.findByOrFail('id', params.id)
    nhanVien.daNghiViec = request.input('thoiGianKetThuc')
    await nhanVien.save()

    await ThongTinNghiViec.create({
      nhanVienId: params.id,
      thoiGianKetThuc: request.input('thoiGianKetThuc') || DateTime.now(),
      thongTinKhac: request.input('thongTinKhac'),
    })
    return 'OK'
  }
}
