const express = require('express');
const {
    createUnlockRequest,
    getUnlockRequests,
    getUnlockRequest,
    approveUnlockRequest,
    rejectUnlockRequest,
    deleteUnlockRequest
} = require('../controllers/unlockRequestController');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router.route('/')
    .get(getUnlockRequests)
    .post(createUnlockRequest);

router.route('/:id')
    .get(getUnlockRequest)
    .delete(deleteUnlockRequest);

router.put('/:id/approve', approveUnlockRequest);
router.put('/:id/reject', rejectUnlockRequest);

module.exports = router;
