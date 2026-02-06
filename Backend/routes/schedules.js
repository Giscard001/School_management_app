const express = require('express');
const {
    getSchedules,
    createSchedule,
    deleteSchedule
} = require('../controllers/scheduleController');

const router = express.Router();

router
    .route('/')
    .get(getSchedules)
    .post(createSchedule);

router
    .route('/:id')
    .delete(deleteSchedule);

module.exports = router;
