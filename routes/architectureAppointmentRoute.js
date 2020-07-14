const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const architectureAppointmentCtrl = require('../controllers/architectureAppointmentController');

router.post('/insert', architectureAppointmentCtrl.insertingArchitectureAppointment);
router.delete('/:architectureAppointmentId', architectureAppointmentCtrl.deleteArchitectureAppointment);

module.exports = router;