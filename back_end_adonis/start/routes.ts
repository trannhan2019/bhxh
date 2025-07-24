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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('api/phongs', [PhongsController, 'index'])
// router.get('/phongs/:id', 'PhongsController.show')
// router.post('/phongs', 'PhongsController.store')
// router.put('/phongs/:id', 'PhongsController.update')
// router.delete('/phongs/:id', 'PhongsController.destroy')
router.get('api/chuc_vus', [ChucVusController, 'index'])
router.get('api/nhan_viens', [NhanViensController, 'index'])
