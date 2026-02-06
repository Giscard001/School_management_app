const AbsenceJustification = require('../models/AbsenceJustification');
const User = require('../models/User');

// @desc    Create an absence justification
// @route   POST /api/v1/absences/justify
// @access  Private/Parent
exports.justifyAbsence = async (req, res) => {
    try {
        const { reason, details, absenceId, eleveId } = req.body;

        if (!reason) {
            return res.status(400).json({ success: false, error: "Le motif est requis" });
        }

        let eleve = null;
        if (eleveId) {
            const child = await User.findOne({ _id: eleveId, parent: req.user.id, role: 'ELEVE' });
            if (!child) {
                return res.status(403).json({ success: false, error: 'Enfant non autorisé' });
            }
            eleve = child._id;
        }

        const justification = await AbsenceJustification.create({
            parent: req.user.id,
            eleve,
            absenceId,
            reason,
            details,
            file: req.file ? req.file.filename : null
        });

        res.status(201).json({
            success: true,
            data: justification
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};