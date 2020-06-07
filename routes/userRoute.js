const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.get('/hi', auth, userCtrl.hi);
router.post('/refreshToken', userCtrl.refreshToken);
router.post('/myRefreshToken', userCtrl.myRefreshToken);
router.delete('/:userId', userCtrl.deleteUser);
router.put('/registered-otp', userCtrl.registeredOtp);  
router.put('/forgot-password', userCtrl.forgotPassword);
router.put('/reset-passwordotp', userCtrl.resetPasswordotp);
router.put('/reset-password', userCtrl.resetPassword);
router.put('/update', auth, userCtrl.updateUser);


module.exports = router;