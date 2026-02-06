const Classe = require('../models/Classe');

// @desc    Get all classes
// @route   GET /api/v1/classes
// @access  Private
exports.getClasses = async (req, res, next) => {
    try {
        const classes = await Classe.find().populate('professeurPrincipal', 'nom prenom');

        res.status(200).json({
            success: true,
            count: classes.length,
            data: classes
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get single class
// @route   GET /api/v1/classes/:id
// @access  Private
exports.getClasse = async (req, res, next) => {
    try {
        const classe = await Classe.findById(req.params.id).populate('professeurPrincipal', 'nom prenom');

        if (!classe) {
            return res.status(404).json({ success: false, error: 'Classe non trouvée' });
        }

        res.status(200).json({
            success: true,
            data: classe
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create class
// @route   POST /api/v1/classes
// @access  Private/Admin
exports.createClasse = async (req, res, next) => {
    try {
        // Check if professor is already principal of another class
        if (req.body.professeurPrincipal) {
            const existingClass = await Classe.findOne({
                professeurPrincipal: req.body.professeurPrincipal
            });

            if (existingClass) {
                // Remove professor from old class
                await Classe.findByIdAndUpdate(existingClass._id, {
                    $unset: { professeurPrincipal: 1 }
                });
            }
        }

        const classe = await Classe.create(req.body);

        res.status(201).json({
            success: true,
            data: classe
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update class
// @route   PUT /api/v1/classes/:id
// @access  Private/Admin
exports.updateClasse = async (req, res, next) => {
    try {
        // Check if professor is already principal of another class
        if (req.body.professeurPrincipal) {
            const existingClass = await Classe.findOne({
                professeurPrincipal: req.body.professeurPrincipal,
                _id: { $ne: req.params.id }
            });

            if (existingClass) {
                // Remove professor from old class
                await Classe.findByIdAndUpdate(existingClass._id, {
                    $unset: { professeurPrincipal: 1 }
                });
            }
        }

        const classe = await Classe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!classe) {
            return res.status(404).json({ success: false, error: 'Classe non trouvée' });
        }

        res.status(200).json({
            success: true,
            data: classe
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete class
// @route   DELETE /api/v1/classes/:id
// @access  Private/Admin
exports.deleteClasse = async (req, res, next) => {
    try {
        const classe = await Classe.findByIdAndDelete(req.params.id);

        if (!classe) {
            return res.status(404).json({ success: false, error: 'Classe non trouvée' });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
