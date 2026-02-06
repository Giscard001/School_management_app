const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    professeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    statut: {
        type: String,
        enum: ['present', 'late', 'absent'],
        default: 'present',
        required: true
    },
    observations: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index to quickly find attendance for a class on a specific date
AttendanceSchema.index({ classe: 1, date: 1 });
// Index to find a student's attendance history
AttendanceSchema.index({ eleve: 1, date: 1 });

module.exports = mongoose.model('Attendance', AttendanceSchema);
