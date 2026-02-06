const Bulletin = require('../models/Bulletin');
const Note = require('../models/Note');
const User = require('../models/User');
const Classe = require('../models/Classe');
const Matiere = require('../models/Matiere');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Générer un bulletin pour un élève
// @route   POST /api/v1/bulletins/generate
// @access  Private (Censeur/Admin)
exports.generateBulletin = asyncHandler(async (req, res, next) => {
    const { eleve, classe, periode, anneeScolaire } = req.body;

    // Vérifier le rôle
    if (req.user.role !== 'CENSEUR' && req.user.role !== 'ADMIN' && req.user.role !== 'PROVISEUR') {
        return next(new ErrorResponse('Non autorisé à générer des bulletins', 403));
    }

    // Vérifier que l'élève existe
    const eleveDoc = await User.findById(eleve);
    if (!eleveDoc || eleveDoc.role !== 'ELEVE') {
        return next(new ErrorResponse('Élève non trouvé', 404));
    }

    // Vérifier que la classe existe
    const classeDoc = await Classe.findById(classe);
    if (!classeDoc) {
        return next(new ErrorResponse('Classe non trouvée', 404));
    }

    // Vérifier qu'un bulletin n'existe pas déjà
    const existingBulletin = await Bulletin.findOne({
        eleve,
        periode,
        anneeScolaire: anneeScolaire || '2023-2024'
    });

    if (existingBulletin) {
        return next(new ErrorResponse('Un bulletin existe déjà pour cet élève et cette période', 400));
    }

    // Récupérer toutes les notes validées de l'élève pour cette période
    const notes = await Note.find({
        eleve,
        classe,
        periode,
        statut: 'VALIDEE',
        anneeScolaire: anneeScolaire || '2023-2024'
    }).populate('matiere');

    if (notes.length === 0) {
        return next(new ErrorResponse('Aucune note validée trouvée pour cet élève', 400));
    }

    // Créer le bulletin
    const bulletin = await Bulletin.create({
        eleve,
        classe,
        periode,
        anneeScolaire: anneeScolaire || '2023-2024',
        notes: notes.map(n => n._id),
        genereePar: req.user.id
    });

    // Calculer la moyenne générale
    await bulletin.calculerMoyenneGenerale();
    await bulletin.save();

    await bulletin.populate([
        { path: 'eleve', select: 'nom prenom matricule' },
        { path: 'classe', select: 'niveau section filiere' },
        { path: 'notes', populate: { path: 'matiere', select: 'nom coefficient' } },
        { path: 'genereePar', select: 'nom prenom' }
    ]);

    res.status(201).json({
        success: true,
        data: bulletin
    });
});

// @desc    Générer des bulletins pour toute une classe
// @route   POST /api/v1/bulletins/generate-classe
// @access  Private (Censeur/Admin)
exports.generateBulletinsClasse = asyncHandler(async (req, res, next) => {
    const { classe, periode, anneeScolaire } = req.body;

    // Vérifier le rôle
    if (req.user.role !== 'CENSEUR' && req.user.role !== 'ADMIN' && req.user.role !== 'PROVISEUR') {
        return next(new ErrorResponse('Non autorisé à générer des bulletins', 403));
    }

    // Récupérer tous les élèves de la classe
    const eleves = await User.find({ classe, role: 'ELEVE' });

    if (eleves.length === 0) {
        return next(new ErrorResponse('Aucun élève trouvé dans cette classe', 404));
    }

    const bulletinsGeneres = [];
    const erreurs = [];

    for (const eleve of eleves) {
        try {
            // Vérifier qu'un bulletin n'existe pas déjà
            const existingBulletin = await Bulletin.findOne({
                eleve: eleve._id,
                periode,
                anneeScolaire: anneeScolaire || '2023-2024'
            });

            if (existingBulletin) {
                erreurs.push({
                    eleve: `${eleve.prenom} ${eleve.nom}`,
                    erreur: 'Bulletin déjà existant'
                });
                continue;
            }

            // Récupérer les notes validées
            const notes = await Note.find({
                eleve: eleve._id,
                classe,
                periode,
                statut: 'VALIDEE',
                anneeScolaire: anneeScolaire || '2023-2024'
            });

            if (notes.length === 0) {
                erreurs.push({
                    eleve: `${eleve.prenom} ${eleve.nom}`,
                    erreur: 'Aucune note validée'
                });
                continue;
            }

            // Créer le bulletin
            const bulletin = await Bulletin.create({
                eleve: eleve._id,
                classe,
                periode,
                anneeScolaire: anneeScolaire || '2023-2024',
                notes: notes.map(n => n._id),
                genereePar: req.user.id
            });

            await bulletin.calculerMoyenneGenerale();
            await bulletin.save();

            bulletinsGeneres.push(bulletin);
        } catch (error) {
            erreurs.push({
                eleve: `${eleve.prenom} ${eleve.nom}`,
                erreur: error.message
            });
        }
    }

    // Calculer les rangs pour tous les bulletins générés
    for (const bulletin of bulletinsGeneres) {
        await bulletin.calculerRang();
        await bulletin.save();
    }

    res.status(201).json({
        success: true,
        count: bulletinsGeneres.length,
        data: bulletinsGeneres,
        erreurs: erreurs.length > 0 ? erreurs : undefined
    });
});

// @desc    Obtenir les bulletins d'une classe
// @route   GET /api/v1/bulletins/classe/:classeId
// @access  Private
exports.getBulletinsByClasse = asyncHandler(async (req, res, next) => {
    const { periode, statut, anneeScolaire } = req.query;

    let query = { classe: req.params.classeId };

    if (periode) query.periode = periode;
    if (statut) query.statut = statut;
    if (anneeScolaire) query.anneeScolaire = anneeScolaire;

    const bulletins = await Bulletin.find(query)
        .populate('eleve', 'nom prenom matricule')
        .populate('classe', 'niveau section filiere')
        .populate('genereePar', 'nom prenom')
        .sort({ moyenneGenerale: -1 });

    res.status(200).json({
        success: true,
        count: bulletins.length,
        data: bulletins
    });
});

// @desc    Obtenir les bulletins d'un élève
// @route   GET /api/v1/bulletins/eleve/:eleveId
// @access  Private
exports.getBulletinsByEleve = asyncHandler(async (req, res, next) => {
    const bulletins = await Bulletin.find({ eleve: req.params.eleveId })
        .populate('classe', 'niveau section filiere')
        .populate({
            path: 'notes',
            populate: { path: 'matiere', select: 'nom coefficient' }
        })
        .sort('-anneeScolaire -periode');

    res.status(200).json({
        success: true,
        count: bulletins.length,
        data: bulletins
    });
});

// @desc    Obtenir un bulletin par ID
// @route   GET /api/v1/bulletins/:id
// @access  Private
exports.getBulletin = asyncHandler(async (req, res, next) => {
    const bulletin = await Bulletin.findById(req.params.id)
        .populate('eleve', 'nom prenom matricule dateNaissance lieuNaissance')
        .populate('classe', 'niveau section filiere')
        .populate({
            path: 'notes',
            populate: [
                { path: 'matiere', select: 'nom coefficient' },
                { path: 'professeur', select: 'nom prenom' }
            ]
        })
        .populate('genereePar', 'nom prenom');

    if (!bulletin) {
        return next(new ErrorResponse('Bulletin non trouvé', 404));
    }

    res.status(200).json({
        success: true,
        data: bulletin
    });
});

// @desc    Finaliser un bulletin
// @route   PUT /api/v1/bulletins/:id/finalize
// @access  Private (Censeur/Admin)
exports.finalizeBulletin = asyncHandler(async (req, res, next) => {
    // Vérifier le rôle
    if (req.user.role !== 'CENSEUR' && req.user.role !== 'ADMIN' && req.user.role !== 'PROVISEUR') {
        return next(new ErrorResponse('Non autorisé à finaliser des bulletins', 403));
    }

    const bulletin = await Bulletin.findById(req.params.id);

    if (!bulletin) {
        return next(new ErrorResponse('Bulletin non trouvé', 404));
    }

    if (bulletin.statut === 'FINALISE') {
        return next(new ErrorResponse('Ce bulletin est déjà finalisé', 400));
    }

    // Recalculer la moyenne et le rang
    await bulletin.calculerMoyenneGenerale();
    await bulletin.calculerRang();

    bulletin.statut = 'FINALISE';

    // Ajouter signature selon le rôle
    if (req.user.role === 'CENSEUR') {
        bulletin.signatureCenseur = true;
    } else if (req.user.role === 'PROVISEUR') {
        bulletin.signatureProviseur = true;
    }

    await bulletin.save();

    await bulletin.populate([
        { path: 'eleve', select: 'nom prenom matricule' },
        { path: 'classe', select: 'niveau section filiere' },
        { path: 'notes', populate: { path: 'matiere', select: 'nom coefficient' } }
    ]);

    res.status(200).json({
        success: true,
        data: bulletin
    });
});

// @desc    Mettre à jour un bulletin
// @route   PUT /api/v1/bulletins/:id
// @access  Private (Censeur/Admin)
exports.updateBulletin = asyncHandler(async (req, res, next) => {
    let bulletin = await Bulletin.findById(req.params.id);

    if (!bulletin) {
        return next(new ErrorResponse('Bulletin non trouvé', 404));
    }

    // Ne pas permettre la modification si finalisé
    if (bulletin.statut === 'FINALISE' || bulletin.statut === 'DISTRIBUE') {
        return next(new ErrorResponse('Impossible de modifier un bulletin finalisé ou distribué', 400));
    }

    bulletin = await Bulletin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate(['eleve', 'classe', 'notes']);

    res.status(200).json({
        success: true,
        data: bulletin
    });
});

// @desc    Marquer des bulletins comme distribués
// @route   POST /api/v1/bulletins/distribute
// @access  Private (Secrétaire/Admin)
exports.distributeBulletins = asyncHandler(async (req, res, next) => {
    const { bulletinIds } = req.body;

    if (!bulletinIds || bulletinIds.length === 0) {
        return next(new ErrorResponse('Aucun bulletin spécifié', 400));
    }

    const bulletins = await Bulletin.updateMany(
        {
            _id: { $in: bulletinIds },
            statut: 'FINALISE'
        },
        {
            statut: 'DISTRIBUE',
            dateDistribution: Date.now()
        }
    );

    res.status(200).json({
        success: true,
        message: `${bulletins.modifiedCount} bulletin(s) marqué(s) comme distribué(s)`,
        data: bulletins
    });
});

// @desc    Supprimer un bulletin
// @route   DELETE /api/v1/bulletins/:id
// @access  Private (Admin)
exports.deleteBulletin = asyncHandler(async (req, res, next) => {
    const bulletin = await Bulletin.findById(req.params.id);

    if (!bulletin) {
        return next(new ErrorResponse('Bulletin non trouvé', 404));
    }

    // Seul l'admin peut supprimer
    if (req.user.role !== 'ADMIN') {
        return next(new ErrorResponse('Non autorisé', 403));
    }

    await bulletin.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Obtenir les statistiques des bulletins
// @route   GET /api/v1/bulletins/stats
// @access  Private
exports.getBulletinStats = asyncHandler(async (req, res, next) => {
    const { classe, periode, anneeScolaire } = req.query;

    let query = {};
    if (classe) query.classe = classe;
    if (periode) query.periode = periode;
    if (anneeScolaire) query.anneeScolaire = anneeScolaire;

    const stats = await Bulletin.aggregate([
        { $match: query },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                moyenneMax: { $max: '$moyenneGenerale' },
                moyenneMin: { $min: '$moyenneGenerale' },
                moyenneClasse: { $avg: '$moyenneGenerale' },
                brouillons: {
                    $sum: { $cond: [{ $eq: ['$statut', 'BROUILLON'] }, 1, 0] }
                },
                finalises: {
                    $sum: { $cond: [{ $eq: ['$statut', 'FINALISE'] }, 1, 0] }
                },
                distribues: {
                    $sum: { $cond: [{ $eq: ['$statut', 'DISTRIBUE'] }, 1, 0] }
                }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: stats[0] || {}
    });
});
