const express = require('express');
const { getProviseurStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('ADMIN', 'PROVISEUR'));

router.get('/proviseur', getProviseurStats);

module.exports = router;
