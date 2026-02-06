const express = require('express');
const router = express.Router();
const {
    getAllEvaluations,
    createEvaluation,
    getMyEvaluations,
    getPendingEvaluations,
    validateEvaluation,
    getValidatedEvaluations
} = require('../controllers/evaluationController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, authorize('PROVISEUR', 'ADMIN', 'CENSEUR'), getAllEvaluations)
    .post(protect, authorize('PROFESSEUR'), createEvaluation);

router.get('/me', protect, authorize('PROFESSEUR'), getMyEvaluations);
router.get('/pending', protect, authorize('CENSEUR', 'ADMIN'), getPendingEvaluations);
router.put('/:id/validate', protect, authorize('CENSEUR', 'ADMIN'), validateEvaluation);
router.get('/validated', protect, getValidatedEvaluations);

module.exports = router;
