const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: [true, 'La classe est requise']
    },
    matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: [true, 'La matière est requise']
    },
    professeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jour: {
        type: String,
        required: [true, 'Le jour est requis'],
        enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    },
    creneau: {
        type: String,
        required: [true, 'Le créneau horaire est requis']
        // Example format: "08:00"
    },
    salle: {
        type: String,
        default: 'TBD'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Avoid duplicate slots for the same class/day/time
ScheduleSchema.index({ classe: 1, jour: 1, creneau: 1 }, { unique: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
