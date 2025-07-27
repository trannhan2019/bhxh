import { dulieuBacNgachLuong } from '#database/data/bac-luong'
import { chucvuData } from '#database/data/chuc-vu'
import { duLieuHeSoPhuCap } from '#database/data/he-so-phu-cap'
import { duLieuHeSoTrachNhiem } from '#database/data/he-so-trach-nhiem'
import { dataLichSuBHXH } from '#database/data/lich-su-bhxh'
import { duLieuMucLuongToiThieu } from '#database/data/muc-luong-toi-thieu'
import { dulieuNgachLuong } from '#database/data/ngach-luong'
import { nhanVienData } from '#database/data/nhan-vien'
import { phongData } from '#database/data/phong'
import { dulieuBHXH } from '#database/data/theo-doi-bhxh'
import BacLuong from '#models/bac_luong'
import ChucVu from '#models/chuc_vu'
import HeSoPhuCap from '#models/he_so_phu_cap'
import HeSoTrachNhiem from '#models/he_so_trach_nhiem'
import LichSuBhxh from '#models/lich_su_bhxh'
import MucLuongToiThieuVung from '#models/muc_luong_toi_thieu_vung'
import NgachLuong from '#models/ngach_luong'
import NhanVien from '#models/nhan_vien'
import Phong from '#models/phong'
import ThongTinBhxh from '#models/thong_tin_bhxh'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Phong.createMany(phongData)
    await ChucVu.createMany(chucvuData)
    await NhanVien.createMany(nhanVienData)
    await MucLuongToiThieuVung.createMany(duLieuMucLuongToiThieu)
    await HeSoPhuCap.createMany(duLieuHeSoPhuCap)
    await HeSoTrachNhiem.createMany(duLieuHeSoTrachNhiem)
    await NgachLuong.createMany(dulieuNgachLuong)
    await BacLuong.createMany(dulieuBacNgachLuong)
    await ThongTinBhxh.createMany(dulieuBHXH)
    await LichSuBhxh.createMany(dataLichSuBHXH)
  }
}
