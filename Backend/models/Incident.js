const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "L'élève est requis"]
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    titre: {
        type: String,
        required: [true, "Le titre est requis"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "La description est requise"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: [true, "Le type d'incident est requis"],
        enum: ['Discipline', 'Médical', 'Pédagogique', 'Autre'],
        default: 'Discipline'
    },
    priorite: {
        type: String,
        enum: ['Basse', 'Moyenne', 'Haute'],
        default: 'Moyenne'
    },
    statut: {
        type: String,
        enum: ['Non traité', 'En cours', 'Traité'],
        default: 'Non traité'
    },
    lieu: {
        type: String,
        trim: true
    },
    personnesImpliquees: [
        {
            type: String
        }
    ],
    actionsPrises: [
        {
            type: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Incident', IncidentSchema);
