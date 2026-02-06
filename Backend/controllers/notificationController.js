const Notification = require('../models/Notification');
const User = require('../models/User');
const Classe = require('../models/Classe');

// @desc    Send a notification
// @route   POST /api/v1/notifications
// @access  Private (Staff only)
exports.sendNotification = async (req, res, next) => {
    try {
        const { subject, content, type, targetClasses, targetRoles, channels } = req.body;

        let recipientIds = [];

        if (type === 'classe') {
            // Find all students in selected classes
            const students = await User.find({
                role: 'ELEVE',
                classe: { $in: targetClasses }
            }).select('_id');
            recipientIds = students.map(s => s._id);
        } else if (type === 'role') {
            // Find all users with selected roles
            const users = await User.find({
                role: { $in: targetRoles }
            }).select('_id');
            recipientIds = users.map(u => u._id);
        }

        const recipients = recipientIds.map(id => ({ user: id }));

        const notification = await Notification.create({
            sender: req.user._id,
            subject,
            content,
            type,
            targetClasses,
            targetRoles,
            recipients,
            channels,
            status: 'Envoyé'
        });

        res.status(201).json({
            success: true,
            data: notification
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get notifications for logged in user
// @route   GET /api/v1/notifications
// @access  Private
exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({
            'recipients.user': req.user._id
        })
            .populate('sender', 'nom prenom role')
            .sort({ createdAt: -1 });

        // Format response to include read status specifically for this user
        const formattedNotifications = notifications.map(notif => {
            const userRecipient = notif.recipients.find(r => r.user.toString() === req.user._id.toString());
            return {
                _id: notif._id,
                subject: notif.subject,
                content: notif.content,
                sender: notif.sender,
                createdAt: notif.createdAt,
                read: userRecipient ? userRecipient.read : false,
                readAt: userRecipient ? userRecipient.readAt : null
            };
        });

        res.status(200).json({
            success: true,
            count: formattedNotifications.length,
            data: formattedNotifications
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get notifications sent by logged in user
// @route   GET /api/v1/notifications/sent
// @access  Private
exports.getSentNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ sender: req.user._id })
            .populate('targetClasses', 'niveau section')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Mark notification as read
// @route   PUT /api/v1/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                'recipients.user': req.user._id
            },
            {
                $set: {
                    'recipients.$.read': true,
                    'recipients.$.readAt': Date.now()
                }
            },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ success: false, error: 'Notification non trouvée' });
        }

        res.status(200).json({ success: true, data: notification });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
