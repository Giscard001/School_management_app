const express = require('express');
const {
    getStudentsByClass,
    saveAttendance,
    getClassAttendanceStats,
    getDetailedAttendanceList
} = require('../controllers/attendanceController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.post('/', authorize('PROFESSEUR', 'ADMIN'), saveAttendance);
router.get('/students/:classeId', getStudentsByClass);
router.get('/stats/:classeId', authorize('CPE', 'ADMIN', 'PROVISEUR'), getClassAttendanceStats);
router.get('/list/:classeId', authorize('CPE', 'ADMIN', 'PROVISEUR'), getDetailedAttendanceList);

module.exports = router;
