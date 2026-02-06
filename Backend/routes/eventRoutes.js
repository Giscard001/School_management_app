const express = require('express');
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getEvents)
    .post(authorize('ADMIN', 'CPE', 'PROVISEUR'), createEvent);

router.route('/:id')
    .put(authorize('ADMIN', 'CPE', 'PROVISEUR'), updateEvent)
    .delete(authorize('ADMIN', 'CPE', 'PROVISEUR'), deleteEvent);

module.exports = router;
