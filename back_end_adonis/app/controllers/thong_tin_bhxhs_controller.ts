import type { HttpContext } from '@adonisjs/core/http'
import ThongTinBhxhService from '#services/thong_tin_bhxh_service'
import ExcelService from '#services/excel_service'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import ThongTinBhxh from '#models/thong_tin_bhxh'
import BacLuong from '#models/bac_luong'
import LichSuBhxh from '#models/lich_su_bhxh'
import MucLuongToiThieuVung from '#models/muc_luong_toi_thieu_vung'

export default class ThongTinBhxhsController {
  private DAYS_BETWEEN_EMAILS = 5
  private SO_NGAY_KIEM_TRA = 15
  private thongTinBhxhService: ThongTinBhxhService
  private excelService: ExcelService
  constructor() {
    this.thongTinBhxhService = new ThongTinBhxhService()
    this.excelService = new ExcelService()
  }
  index() {
    return this.thongTinBhxhService.getThongTinBhxhs()
  }

  async show({ params }: HttpContext) {
    const id = params.id
    return await this.thongTinBhxhService.getThongTinBhxh(id)
  }

  async report({ params, response }: HttpContext) {
    const id = params.id
    const ThongTinBhxh = await this.thongTinBhxhService.getThongTinBhxh(id)
    const buffer = await this.excelService.xuatExcelBhxhWithTemplate(ThongTinBhxh)
    return response
      .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .header('Content-Disposition', 'attachment; filename="bhxh.xlsx"')
      .send(buffer)
  }

  async sendNotificationEmail() {
    const now = DateTime.now()
    const getThongTinBhxhGanDenHan = await this.thongTinBhxhService.getThongTinBhxhGanDenHan()
    if (getThongTinBhxhGanDenHan.length === 0) return
    for (const thongTinBhxh of getThongTinBhxhGanDenHan) {
      const canSendEmail =
        !thongTinBhxh.lastEmailSentAt ||
        now.diff(thongTinBhxh.lastEmailSentAt, 'days').days > this.DAYS_BETWEEN_EMAILS
      if (canSendEmail) {
        await mail.send((message) => {
          message
            .from('phongtochuchanhchinh.sba@gmail.com')
            .to('trannhan.s3@gmail.com', 'thu')
            .subject('Thông báo nâng lương BHXH gần đến hạn')
            .html(`<p>Chúng tôi xin thông báo rằng nhân viên <strong>${thongTinBhxh.nhanVien.ten}</strong>
        thuộc ngạch <strong>${thongTinBhxh.ngachLuong.chucDanh}</strong>, bậc <strong>${thongTinBhxh.bacLuong.bac}</strong> sắp đến kỳ nâng bậc.</p>
        <p>Ngày áp dụng thông tin BHXH hiện tại: <strong>${thongTinBhxh.ngayApDung.toFormat('dd/MM/yyyy')}</strong></p>
        <p>Ngày dự kiến nâng bậc tiếp theo: <strong>${thongTinBhxh.ngayApDung.plus({ days: thongTinBhxh.bacLuong.thoiGianNangBac }).toFormat('dd/MM/yyyy')}</strong></p>
        <p>Trân trọng,</p>
        <p>Hệ thống quản lý</p>`)
        })
        thongTinBhxh.lastEmailSentAt = now
        await thongTinBhxh.save()
      }
    }
    return getThongTinBhxhGanDenHan
  }

  async xacNhanNangLuong({ params }: HttpContext) {
    const id = params.id
    const bhxh = await this.thongTinBhxhService.getThongTinBhxh(id)
    if (!bhxh) return
    const isMaxBac = bhxh.ngachLuong.bacLuong.length === bhxh.bacLuong.bac
    const kiemTraDieuKienNgayNangLuong =
      bhxh.ngayApDung.plus({ days: bhxh.bacLuong.thoiGianNangBac }).diffNow('days').days <
      this.SO_NGAY_KIEM_TRA

    if (!isMaxBac && kiemTraDieuKienNgayNangLuong) {
      const bacLuongMoi = await BacLuong.query()
        .where('bac', bhxh.bacLuong.bac + 1)
        .andWhere('ngachLuongId', bhxh.ngachLuongId)
        .firstOrFail()
      //update bậc lương BHXH
      bhxh.bacLuongId = bacLuongMoi.id
      bhxh.ngayApDung = bhxh.ngayApDung.plus({ days: bhxh.bacLuong.thoiGianNangBac })
      const bhxhMoi = await bhxh.save()
      //Thêm mới lịch sử BHXH
      const lichSuBhxh = new LichSuBhxh()
      const mucLuong = await MucLuongToiThieuVung.query().orderBy('thoiGianApdung', 'desc').first()
      lichSuBhxh.nhanVienId = bhxhMoi.nhanVienId
      lichSuBhxh.bacLuongId = bacLuongMoi.id
      lichSuBhxh.phuCapId = bhxhMoi.phuCapId
      lichSuBhxh.trachNhiemId = bhxhMoi.trachNhiemId
      lichSuBhxh.mucLuongToiThieuVungId = mucLuong?.id || 0
      lichSuBhxh.ngayApDung = bhxhMoi.ngayApDung
      lichSuBhxh.thongTinQD = 'Cập nhật thông tin sau khi có Quyết định nâng bậc'
      await lichSuBhxh.save()
    }
    return bhxh
  }

  //////////////////////////////////////
  async test() {
    const BHXH = await ThongTinBhxh.findByOrFail('id', 8)
    BHXH.lastEmailSentAt = DateTime.now().minus({ days: 8 })
    await BHXH.save()
    return BHXH
  }
}
