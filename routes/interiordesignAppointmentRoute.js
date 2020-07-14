const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const interiordesignAppointmentCtrl = require('../controllers/interiordesignAppointmentController');

router.post('/insert', interiordesignAppointmentCtrl.insertingInteriordesignAppointment);
router.delete('/:interiordesignAppointmentId', interiordesignAppointmentCtrl.deleteInteriordesignAppointment);

module.exports = router;