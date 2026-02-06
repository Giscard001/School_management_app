const express = require('express');
const { register, login, getMe, updateDetails, updatePassword, uploadPhoto } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/photo', protect, upload.single('photo'), uploadPhoto);

module.exports = router;
