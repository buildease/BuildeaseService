const express = require('express');
const router = express.Router();
const prdCtrl = require('../controllers/productController');
const auth = require('../middleware/auth');

router.post('/insert', auth, prdCtrl.insertingProduct);
router.put('/update', auth, prdCtrl.updateProduct);
router.get('/list', auth, prdCtrl.productList);
router.get('/:productId', auth,  prdCtrl.findByProdcutId);
router.delete('/:productId', auth, prdCtrl.deleteProduct);



module.exports = router;