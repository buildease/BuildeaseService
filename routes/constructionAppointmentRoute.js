const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const constructionAppointmentCtrl = require('../controllers/constructionAppointmentController');

router.post('/insert', constructionAppointmentCtrl.insertingConstructionAppointment);
router.delete('/:constructionAppointmentId', constructionAppointmentCtrl.deleteConstructionAppointment);

module.exports = router;