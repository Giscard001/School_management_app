const express = require('express');
const { getCPEStats, downloadWeeklyReport, getCPEDashboard } = require('../controllers/statsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('ADMIN', 'PROVISEUR', 'CENSEUR', 'CPE', 'PROFESSEUR', 'SECRETAIRE'));

router.get('/cpe', getCPEStats);
router.get('/report', downloadWeeklyReport);
router.get('/dashboard', getCPEDashboard);

module.exports = router;
