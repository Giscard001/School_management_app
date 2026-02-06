const express = require('express');
const {
    getClasses,
    getClasse,
    createClasse,
    updateClasse,
    deleteClasse
} = require('../controllers/classeController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Re-route into other resource routers (must be after protect)
const classeMatiereRouter = require('./classeMatiereRoutes');
router.use('/:classeId/matieres', classeMatiereRouter);

router
    .route('/')
    .get(getClasses)
    .post(authorize('ADMIN', 'PROVISEUR', 'CENSEUR', 'SECRETAIRE'), createClasse);

router
    .route('/:id')
    .get(getClasse)
    .put(authorize('ADMIN', 'PROVISEUR', 'CENSEUR', 'SECRETAIRE'), updateClasse)
    .delete(authorize('ADMIN', 'PROVISEUR', 'CENSEUR'), deleteClasse);

module.exports = router;
