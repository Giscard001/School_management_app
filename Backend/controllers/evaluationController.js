const Evaluation = require('../models/Evaluation');
const ClasseMatiere = require('../models/ClasseMatiere');
const User = require('../models/User');

// @desc    Create a new evaluation request
// @route   POST /api/v1/evaluations
// @access  Private/Professor
exports.createEvaluation = async (req, res) => {
    try {
        const { titre, type, classeId, matiereId, date, heureDebut, heureFin, salle, description } = req.body;

        // Verify assignment
        const assignment = await ClasseMatiere.findOne({
            classe: classeId,
            matiere: matiereId,
            professeur: req.user.id
        });

        if (!assignment) {
            return res.status(403).json({ success: false, error: "Vous n'êtes pas autorisé à programmer une évaluation pour cette classe/matière." });
        }

        const evaluation = await Evaluation.create({
            titre,
            type,
            classe: classeId,
            matiere: matiereId,
            professeur: req.user.id,
            date,
            heureDebut,
            heureFin,
            salle,
            description,
            statut: 'EN_ATTENTE'
        });

        res.status(201).json({
            success: true,
            data: evaluation
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get all evaluations (for Proviseur/Admin)
// @route   GET /api/v1/evaluations
// @access  Private/Proviseur/Admin
exports.getAllEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find()
            .populate('classe', 'niveau section')
            .populate('matiere', 'nom')
            .populate('professeur', 'nom prenom')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: evaluations.length,
            data: evaluations
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get evaluations for logged in professor
// @route   GET /api/v1/evaluations/me
// @access  Private/Professor
exports.getMyEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ professeur: req.user.id })
            .populate('classe', 'niveau section')
            .populate('matiere', 'nom')
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: evaluations.length,
            data: evaluations
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get all pending evaluations (for Censeur)
// @route   GET /api/v1/evaluations/pending
// @access  Private/Censeur
exports.getPendingEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ statut: 'EN_ATTENTE' })
            .populate('classe', 'niveau section')
            .populate('matiere', 'nom')
            .populate('professeur', 'nom prenom photo')
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: evaluations.length,
            data: evaluations
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Validate or Reject evaluation
// @route   PUT /api/v1/evaluations/:id/validate
// @access  Private/Censeur
exports.validateEvaluation = async (req, res) => {
    try {
        const { statut, commentaire } = req.body; // statut: 'VALIDE' or 'REFUSE'

        if (!['VALIDE', 'REFUSE'].includes(statut)) {
            return res.status(400).json({ success: false, error: "Statut invalide" });
        }

        const evaluation = await Evaluation.findByIdAndUpdate(
            req.params.id,
            {
                statut,
                commentaireCenseur: commentaire
            },
            { new: true }
        );

        if (!evaluation) {
            return res.status(404).json({ success: false, error: "Évaluation non trouvée" });
        }

        // Optional: Create Notification for Professor
        // await Notification.create({ ... })

        res.status(200).json({
            success: true,
            data: evaluation
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get validated evaluations (for Calendar/Students)
// @route   GET /api/v1/evaluations/validated
// @access  Private
exports.getValidatedEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ statut: 'VALIDE' })
            .populate('classe', 'niveau section')
            .populate('matiere', 'nom')
            .populate('professeur', 'nom prenom')
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: evaluations.length,
            data: evaluations
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
