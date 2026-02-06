const express = require('express');
const {
    getIncidents,
    getIncident,
    createIncident,
    updateIncident,
    deleteIncident
} = require('../controllers/incidentController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Anyone except PARENT and ELEVE can report an incident
router.route('/')
    .get(authorize('ADMIN', 'CPE', 'PROVISEUR', 'CENSEUR'), getIncidents)
    .post(authorize('ADMIN', 'CPE', 'PROVISEUR', 'CENSEUR', 'PROFESSEUR', 'SECRETAIRE'), createIncident);

router.route('/:id')
    .get(getIncident)
    .put(authorize('ADMIN', 'CPE', 'PROVISEUR'), updateIncident)
    .delete(authorize('ADMIN', 'CPE'), deleteIncident);

module.exports = router;
