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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('phong', [PhongsController, 'index'])
    router.get('chuc-vu', [ChucVusController, 'index'])
    router.get('nhan-vien', [NhanViensController, 'index'])
    router.get('muc-luong-toi-thieu', [MucLuongToiThieuVungsController, 'index'])
    router.get('muc-luong-toi-thieu-moi-nhat', [
      MucLuongToiThieuVungsController,
      'getMucLuongMoiNhat',
    ])
    router.get('he-so-phu-cap', [HeSoPhuCapsController, 'index'])
    router.get('he-so-trach-nhiem', [HeSoTrachNhiemsController, 'index'])
    router
      .group(() => {
        router.get('', [NgachLuongsController, 'index'])
        router.get('bac-luong', [NgachLuongsController, 'getNgachBacLuong'])
      })
      .prefix('ngach-luong')
    router.get('bac-luong', [BacLuongsController, 'index'])
    router
      .group(() => {
        router.get('', [ThongTinBhxhsController, 'index'])
        router.get(':id', [ThongTinBhxhsController, 'show'])
      })
      .prefix('theo-doi-bhxh')
  })
  .prefix('api')

// router.get('/phongs/:id', 'PhongsController.show')
// router.post('/phongs', 'PhongsController.store')
// router.put('/phongs/:id', 'PhongsController.update')
// router.delete('/phongs/:id', 'PhongsController.destroy')
