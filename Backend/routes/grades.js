const express = require('express');
const router = express.Router();
const { getGrades, createGrade, importGrades, validateGrades, updateGrades } = require('../controllers/gradeController');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(getGrades)
    .post(createGrade);

router.post('/import', protect, authorize('PROFESSEUR'), upload.single('file'), importGrades);
router.put('/validate', protect, authorize('PROFESSEUR'), validateGrades);
router.put('/bulk', protect, authorize('PROFESSEUR'), updateGrades);

module.exports = router;
