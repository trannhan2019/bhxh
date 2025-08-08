import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';
import { join } from 'path';

@Injectable()
export class ReportService {
  async exportThongTinBhxhToExcel(data: {
    nhanVien: { ten: string; phong: { ten: string } };
  }) {
    // 1. Đọc file template
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(
      join(__dirname, '..', 'templates', 'bhxh_template.xlsx'),
    );

    const worksheet = workbook.getWorksheet('Sheet1');
    if (!worksheet) throw new Error("Không tìm thấy worksheet 'Sheet1'");

    worksheet.getCell('A3').value = 'Họ và tên: ';
    worksheet.getCell('B3').value = data.nhanVien.ten;

    worksheet.getCell('A4').value = 'Đơn vị: ';
    worksheet.getCell('B4').value = data.nhanVien.phong.ten;

    // 4. Xuất ra Buffer (để gửi qua HTTP)
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
