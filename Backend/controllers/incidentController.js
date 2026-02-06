const Incident = require('../models/Incident');
const User = require('../models/User');

// @desc    Get all incidents
// @route   GET /api/v1/incidents
// @access  Private (CPE, Admin, Proviseur)
exports.getIncidents = async (req, res, next) => {
    try {
        const incidents = await Incident.find()
            .populate({
                path: 'eleve',
                select: 'nom prenom classe',
                populate: {
                    path: 'classe',
                    select: 'niveau section nom'
                }
            })
            .populate('reportedBy', 'nom prenom role')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: incidents.length,
            data: incidents
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get single incident
// @route   GET /api/v1/incidents/:id
// @access  Private
exports.getIncident = async (req, res, next) => {
    try {
        const incident = await Incident.findById(req.params.id)
            .populate({
                path: 'eleve',
                select: 'nom prenom classe',
                populate: {
                    path: 'classe',
                    select: 'niveau section nom'
                }
            })
            .populate('reportedBy', 'nom prenom role');

        if (!incident) {
            return res.status(404).json({ success: false, error: 'Incident non trouvé' });
        }

        res.status(200).json({
            success: true,
            data: incident
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create new incident
// @route   POST /api/v1/incidents
// @access  Private (All except PARENT, ELEVE)
exports.createIncident = async (req, res, next) => {
    try {
        req.body.reportedBy = req.user.id;

        const incident = await Incident.create(req.body);

        res.status(201).json({
            success: true,
            data: incident
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Update incident
// @route   PUT /api/v1/incidents/:id
// @access  Private (CPE, Admin, Proviseur)
exports.updateIncident = async (req, res, next) => {
    try {
        let incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({ success: false, error: 'Incident non trouvé' });
        }

        incident = await Incident.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: incident
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Delete incident
// @route   DELETE /api/v1/incidents/:id
// @access  Private (Admin, CPE)
exports.deleteIncident = async (req, res, next) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({ success: false, error: 'Incident non trouvé' });
        }

        await incident.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
