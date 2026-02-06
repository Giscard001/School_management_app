const mongoose = require('mongoose');

const BulletinSchema = new mongoose.Schema({
    eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'L\'élève est requis']
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: [true, 'La classe est requise']
    },
    periode: {
        type: String,
        required: [true, 'La période est requise'],
        enum: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Semestre 1', 'Semestre 2']
    },
    anneeScolaire: {
        type: String,
        required: [true, 'L\'année scolaire est requise'],
        default: '2023-2024'
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }],
    moyenneGenerale: {
        type: Number,
        min: 0,
        max: 20
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    totalCoefficients: {
        type: Number,
        default: 0
    },
    rang: {
        type: Number,
        min: 1
    },
    effectif: {
        type: Number,
        min: 1
    },
    appreciationGenerale: {
        type: String,
        maxlength: 1000
    },
    decision: {
        type: String,
        enum: ['Admis', 'Redouble', 'Ajourné', 'En cours'],
        default: 'En cours'
    },
    genereePar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateGeneration: {
        type: Date,
        default: Date.now
    },
    statut: {
        type: String,
        enum: ['BROUILLON', 'FINALISE', 'DISTRIBUE'],
        default: 'BROUILLON'
    },
    dateDistribution: {
        type: Date
    },
    signatureCenseur: {
        type: Boolean,
        default: false
    },
    signatureProviseur: {
        type: Boolean,
        default: false
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

// Index pour recherche rapide
BulletinSchema.index({ eleve: 1, periode: 1, anneeScolaire: 1 }, { unique: true });
BulletinSchema.index({ classe: 1, periode: 1, statut: 1 });
BulletinSchema.index({ anneeScolaire: 1, statut: 1 });

// Méthode pour calculer la moyenne générale
BulletinSchema.methods.calculerMoyenneGenerale = async function () {
    await this.populate('notes');

    if (!this.notes || this.notes.length === 0) {
        return 0;
    }

    let totalPoints = 0;
    let totalCoefficients = 0;

    for (const note of this.notes) {
        await note.populate('matiere');
        const coefficient = note.matiere?.coefficient || 1;
        totalPoints += (note.moyenne || 0) * coefficient;
        totalCoefficients += coefficient;
    }

    this.totalPoints = totalPoints;
    this.totalCoefficients = totalCoefficients;
    this.moyenneGenerale = totalCoefficients > 0 ? totalPoints / totalCoefficients : 0;

    return this.moyenneGenerale;
};

// Méthode pour calculer le rang
BulletinSchema.methods.calculerRang = async function () {
    const Bulletin = mongoose.model('Bulletin');

    const bulletins = await Bulletin.find({
        classe: this.classe,
        periode: this.periode,
        anneeScolaire: this.anneeScolaire,
        statut: { $ne: 'BROUILLON' }
    }).sort({ moyenneGenerale: -1 });

    this.effectif = bulletins.length;

    const rang = bulletins.findIndex(b => b._id.toString() === this._id.toString()) + 1;
    this.rang = rang > 0 ? rang : bulletins.length;

    return this.rang;
};

// Middleware pour mettre à jour updatedAt
BulletinSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Bulletin', BulletinSchema);
