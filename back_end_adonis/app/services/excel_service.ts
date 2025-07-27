import ExcelJS from 'exceljs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import type ThongTinBhxh from '#models/thong_tin_bhxh'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default class ExcelService {
  async xuatExcelBhxhWithTemplate(data: ThongTinBhxh) {
    // Đường dẫn đến file template
    const templatePath = join(__dirname, '../../resources/templates/bhxh_template.xlsx')
    // 1. Đọc template
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(templatePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    // 2. Gán dữ liệu vào vị trí bạn muốn
    if (!worksheet) throw new Error("Không tìm thấy worksheet 'Sheet1'")
    worksheet.getCell('A3').value = 'Họ và tên: '
    worksheet.getCell('B3').value = data.nhanVien.ten

    worksheet.getCell('A4').value = 'Đơn vị: '
    worksheet.getCell('B4').value = data.nhanVien.phong.ten

    // 4. Ghi ra buffer và trả về client
    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
  }
}
