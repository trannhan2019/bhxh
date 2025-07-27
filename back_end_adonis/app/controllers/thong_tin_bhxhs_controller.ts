import type { HttpContext } from '@adonisjs/core/http'
import ThongTinBhxhService from '#services/thong_tin_bhxh_service'
import ExcelService from '#services/excel_service'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import ThongTinBhxh from '#models/thong_tin_bhxh'

export default class ThongTinBhxhsController {
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

  async sendEmail() {
    await mail.send((message) => {
      message
        .from('phongtochuchanhchinh.sba@gmail.com')
        .to('trannhan.s3@gmail.com')
        .subject('test')
        .html(`<h1>test</h1>`)
    })
    return 'success'
  }

  async sendNotificationEmail() {
    const now = DateTime.now()
    const getThongTinBhxhGanDenHan = await this.thongTinBhxhService.getThongTinBhxhGanDenHan()
    if (getThongTinBhxhGanDenHan.length === 0) return
    for (const thongTinBhxh of getThongTinBhxhGanDenHan) {
      const canSendEmail =
        !thongTinBhxh.lastEmailSentAt || now.diff(thongTinBhxh.lastEmailSentAt, 'days').days > 7
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

  async test() {
    const BHXH = await ThongTinBhxh.findByOrFail('id', 8)
    BHXH.lastEmailSentAt = DateTime.now().minus({ days: 8 })
    await BHXH.save()
    return BHXH
  }
}
