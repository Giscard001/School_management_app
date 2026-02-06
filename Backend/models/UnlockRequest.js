const mongoose = require('mongoose');

const UnlockRequestSchema = new mongoose.Schema({
    professeur: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Le professeur est requis']
    },
    classe: {
        type: mongoose.Schema.ObjectId,
        ref: 'Classe',
        required: [true, 'La classe est requise']
    },
    matiere: {
        type: mongoose.Schema.ObjectId,
        ref: 'Matiere',
        required: [true, 'La matière est requise']
    },
    periode: {
        type: String,
        required: [true, 'La période est requise'],
        enum: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Semestre 1', 'Semestre 2']
    },
    motif: {
        type: String,
        required: [true, 'Le motif de la demande est requis'],
        maxlength: [500, 'Le motif ne peut pas dépasser 500 caractères']
    },
    statut: {
        type: String,
        enum: ['EN_ATTENTE', 'APPROUVEE', 'REJETEE'],
        default: 'EN_ATTENTE'
    },
    traitePar: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    dateTraitement: {
        type: Date
    },
    raisonRejet: {
        type: String,
        maxlength: [500, 'La raison du rejet ne peut pas dépasser 500 caractères']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware pour mettre à jour updatedAt
UnlockRequestSchema.pre('save', async function () {
    this.updatedAt = Date.now();
});

// Index pour optimiser les requêtes
UnlockRequestSchema.index({ professeur: 1, statut: 1 });
UnlockRequestSchema.index({ statut: 1, createdAt: -1 });

module.exports = mongoose.model('UnlockRequest', UnlockRequestSchema);
