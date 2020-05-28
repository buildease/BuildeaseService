const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const interiordesignCtrl = require('../controllers/interiordesignController');

router.post('/insert', auth, interiordesignCtrl.insertingInteriordesign);
router.put('/update', auth, interiordesignCtrl.updateInteriordesign);
router.get('/list', auth, interiordesignCtrl.InteriordesignList);
router.get('/:interiordesignId', auth,  interiordesignCtrl.findByInteriordesignId);
router.delete('/:interiordesignId', auth, interiordesignCtrl.deleteInteriordesign);


module.exports = router;