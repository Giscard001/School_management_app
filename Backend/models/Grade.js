const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "L'élève est requis"]
    },
    matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: [true, 'La matière est requise']
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: [true, 'La classe est requise']
    },
    valeur: {
        type: Number,
        required: [true, 'La note est requise'],
        min: [0, 'La note minimum est 0'],
        max: [20, 'La note maximum est 20']
    },
    type: {
        type: String,
        enum: ['Devoir', 'Examen', 'TP'],
        default: 'Devoir'
    },
    periode: {
        type: String,
        enum: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'],
        default: 'Trimestre 1'
    },
    date: {
        type: Date,
        default: Date.now
    },
    statut: {
        type: String,
        enum: ['BROUILLON', 'SOUMIS', 'VALIDE'],
        default: 'BROUILLON'
    }
});

module.exports = mongoose.model('Grade', GradeSchema);
