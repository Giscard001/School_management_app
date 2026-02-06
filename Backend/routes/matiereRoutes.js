const express = require('express');
const {
    getMatieres,
    getMatiere,
    createMatiere,
    updateMatiere,
    deleteMatiere
} = require('../controllers/matiereController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

router
    .route('/')
    .get(getMatieres)
    .post(authorize('ADMIN', 'PROVISEUR', 'CENSEUR'), createMatiere);

router
    .route('/:id')
    .get(getMatiere)
    .put(authorize('ADMIN', 'PROVISEUR', 'CENSEUR'), updateMatiere)
    .delete(authorize('ADMIN', 'PROVISEUR'), deleteMatiere);

module.exports = router;
