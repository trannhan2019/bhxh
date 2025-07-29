/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PhongsController = () => import('#controllers/phongs_controller')
const ChucVusController = () => import('#controllers/chuc_vus_controller')
const NhanViensController = () => import('#controllers/nhan_viens_controller')
const MucLuongToiThieuVungsController = () =>
  import('#controllers/muc_luong_toi_thieu_vungs_controller')
const HeSoPhuCapsController = () => import('#controllers/he_so_phu_caps_controller')
const HeSoTrachNhiemsController = () => import('#controllers/he_so_trach_nhiems_controller')
const BacLuongsController = () => import('#controllers/bac_luongs_controller')
const NgachLuongsController = () => import('#controllers/ngach_luongs_controller')
const ThongTinBhxhsController = () => import('#controllers/thong_tin_bhxhs_controller')
const LichSuBhxhsController = () => import('#controllers/lich_su_bhxhs_controller')
const ThongTinNghiViecsController = () => import('#controllers/thong_tin_nghi_viecs_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    //phong
    router.get('phong', [PhongsController, 'index'])
    //chuc vu
    router.get('chuc-vu', [ChucVusController, 'index'])
    //nhan vien
    router.get('nhan-vien', [NhanViensController, 'index'])
    router.get('nhan-vien/:id', [NhanViensController, 'show'])
    //muc luong toi thieu
    router.get('muc-luong-toi-thieu', [MucLuongToiThieuVungsController, 'index'])
    router.get('muc-luong-toi-thieu-moi-nhat', [
      MucLuongToiThieuVungsController,
      'getMucLuongMoiNhat',
    ])
    //he so phu cap
    router.get('he-so-phu-cap', [HeSoPhuCapsController, 'index'])
    //he so trach nhiem
    router.get('he-so-trach-nhiem', [HeSoTrachNhiemsController, 'index'])
    //ngach luong
    router
      .group(() => {
        router.get('', [NgachLuongsController, 'index'])
        router.get('bac-luong', [NgachLuongsController, 'getNgachBacLuong'])
      })
      .prefix('ngach-luong')
    //bac luong
    router.get('bac-luong', [BacLuongsController, 'index'])
    //theo doi thong tin Bhxh
    router
      .group(() => {
        router.get('', [ThongTinBhxhsController, 'index'])
        router.get('/send-email', [ThongTinBhxhsController, 'sendNotificationEmail'])
        router.get('report/:id', [ThongTinBhxhsController, 'report'])
        router.get('xac-nhan/:id', [ThongTinBhxhsController, 'xacNhanNangLuong'])
        router.get(':id', [ThongTinBhxhsController, 'show'])
      })
      .prefix('theo-doi-bhxh')
    //lich su Bhxh
    router.get('lich-su-bhxh/:id', [LichSuBhxhsController, 'getByNhanVien'])
    router.get('theo-doi-nghi-viec', [ThongTinNghiViecsController, 'index'])
    router.get('theo-doi-nghi-viec/xac-nhan/:id', [ThongTinNghiViecsController, 'index'])
    /////////////////////////////////////////
    router.get('test', [ThongTinBhxhsController, 'test'])
  })
  .prefix('api')

// router.get('/phongs/:id', 'PhongsController.show')
// router.post('/phongs', 'PhongsController.store')
// router.put('/phongs/:id', 'PhongsController.update')
// router.delete('/phongs/:id', 'PhongsController.destroy')
