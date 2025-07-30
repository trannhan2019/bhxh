import ThongTinBhxh from '#models/thong_tin_bhxh'
import { DateTime } from 'luxon'

export default class ThongTinBhxhService {
  private SO_NGAY_KIEM_TRA = 15
  getThongTinBhxhs() {
    return ThongTinBhxh.query()
      .whereHas('nhanVien', (query) => {
        query.whereNull('daNghiViec')
      })
      .preload('nhanVien', (query) => {
        query.preload('phong')
      })
      .preload('bacLuong')
      .preload('ngachLuong', (ngachLuongQuery) => {
        ngachLuongQuery.preload('bacLuong')
      })
      .preload('phuCap')
      .preload('trachNhiem')
  }

  getThongTinBhxh(id: number) {
    return ThongTinBhxh.query()
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

  async getThongTinBhxhGanDenHan() {
    const allThongTinBhxh = await ThongTinBhxh.query()
      .preload('nhanVien')
      .preload('ngachLuong', (query) => {
        query.preload('bacLuong')
      })
      .preload('bacLuong')
    // Sử dụng Day.js để tạo các đối tượng ngày
    const now = DateTime.now() // Thời điểm hiện tại

    const locThongTinBhxhs = allThongTinBhxh.filter((thongTinBhxh) => {
      const ngayApDung = thongTinBhxh.ngayApDung
      const ngayDenHan = ngayApDung.plus({ days: thongTinBhxh.bacLuong.thoiGianNangBac })

      return (
        thongTinBhxh.ngachLuong.bacLuong.length !== thongTinBhxh.bacLuong.bac &&
        ngayDenHan.diff(now, 'days').days < this.SO_NGAY_KIEM_TRA
      )
    })

    return locThongTinBhxhs
  }
}
