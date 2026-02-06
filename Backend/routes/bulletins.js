const express = require('express');
const {
    generateBulletin,
    generateBulletinsClasse,
    getBulletinsByClasse,
    getBulletinsByEleve,
    getBulletin,
    finalizeBulletin,
    updateBulletin,
    distributeBulletins,
    deleteBulletin,
    getBulletinStats
} = require('../controllers/bulletinController');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Routes publiques (nécessitent authentification)
router.use(protect);

router.post('/generate', generateBulletin);
router.post('/generate-classe', generateBulletinsClasse);
router.post('/distribute', distributeBulletins);
router.get('/stats', getBulletinStats);

router.get('/classe/:classeId', getBulletinsByClasse);
router.get('/eleve/:eleveId', getBulletinsByEleve);

router.route('/:id')
    .get(getBulletin)
    .put(updateBulletin)
    .delete(deleteBulletin);

router.put('/:id/finalize', finalizeBulletin);

module.exports = router;
