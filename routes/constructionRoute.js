const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const constructionCtrl = require('../controllers/constructionController');

router.post('/insert', auth, constructionCtrl.insertingConstruction);
router.put('/update', auth, constructionCtrl.updateConstruction);
router.get('/list', auth, constructionCtrl.ConstructionList);
router.get('/:constructionId', auth,  constructionCtrl.findByConstructionId);
router.delete('/:constructionId', auth, constructionCtrl.deleteConstruction);


module.exports = router;