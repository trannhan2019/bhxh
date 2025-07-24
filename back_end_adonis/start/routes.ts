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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('api/phong', [PhongsController, 'index'])
// router.get('/phongs/:id', 'PhongsController.show')
// router.post('/phongs', 'PhongsController.store')
// router.put('/phongs/:id', 'PhongsController.update')
// router.delete('/phongs/:id', 'PhongsController.destroy')
router.get('api/chuc-vu', [ChucVusController, 'index'])
router.get('api/nhan-vien', [NhanViensController, 'index'])
router.get('api/muc-luong-toi-thieu', [MucLuongToiThieuVungsController, 'index'])
router.get('api/he-so-phu-cap', [HeSoPhuCapsController, 'index'])
router.get('api/he-so-trach-nhiem', [HeSoTrachNhiemsController, 'index'])
