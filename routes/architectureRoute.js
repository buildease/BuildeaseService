const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const architectureCtrl = require('../controllers/architectureController');

router.post('/insert', auth, architectureCtrl.insertingArchitecture);
router.put('/update', auth, architectureCtrl.updateArchitecture);
router.get('/list', auth, architectureCtrl.ArchitectureList);
router.get('/:architectureId', auth,  architectureCtrl.findByArchitectureId);
router.delete('/:architectureId', auth, architectureCtrl.deleteArchitecture);



module.exports = router;