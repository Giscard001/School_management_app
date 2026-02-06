const express = require('express');
const {
    sendNotification,
    getNotifications,
    getSentNotifications,
    markAsRead
} = require('../controllers/notificationController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .get(getNotifications)
    .post(authorize('ADMIN', 'PROVISEUR', 'CENSEUR', 'CPE', 'PROFESSEUR', 'SECRETAIRE'), sendNotification);

router.get('/sent', authorize('ADMIN', 'PROVISEUR', 'CENSEUR', 'CPE', 'PROFESSEUR', 'SECRETAIRE'), getSentNotifications);

router.put('/:id/read', markAsRead);

module.exports = router;
