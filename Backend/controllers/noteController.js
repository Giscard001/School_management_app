const Note = require('../models/Note');
const User = require('../models/User');
const Matiere = require('../models/Matiere');
const Classe = require('../models/Classe');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Créer des notes pour un élève
// @route   POST /api/v1/notes
// @access  Private (Professeur)
exports.createNotes = asyncHandler(async (req, res, next) => {
    const { eleve, matiere, classe, periode, notes, appreciation } = req.body;

    // Vérifier que l'utilisateur est professeur
    if (req.user.role !== 'PROFESSEUR') {
        return next(new ErrorResponse('Seuls les professeurs peuvent saisir des notes', 403));
    }

    // Vérifier que la matière existe
    const matiereDoc = await Matiere.findById(matiere);
    if (!matiereDoc) {
        return next(new ErrorResponse('Matière non trouvée', 404));
    }

    // Note: La vérification de l'affectation professeur-matière-classe 
    // est gérée par le modèle ClasseMatiere, pas par Matiere.professeur

    // Vérifier que l'élève existe et est bien un élève
    const eleveDoc = await User.findById(eleve);
    if (!eleveDoc || eleveDoc.role !== 'ELEVE') {
        return next(new ErrorResponse('Élève non trouvé', 404));
    }

    // Vérifier qu'il n'existe pas déjà une note pour cet élève/matière/période
    const existingNote = await Note.findOne({
        eleve,
        matiere,
        periode,
        anneeScolaire: req.body.anneeScolaire || '2023-2024'
    });

    if (existingNote) {
        return next(new ErrorResponse('Des notes existent déjà pour cet élève dans cette matière et période', 400));
    }

    // Créer la note
    const note = await Note.create({
        eleve,
        matiere,
        classe,
        professeur: req.user.id,
        periode,
        notes,
        appreciation,
        anneeScolaire: req.body.anneeScolaire || '2023-2024'
    });

    await note.populate(['eleve', 'matiere', 'classe', 'professeur']);

    res.status(201).json({
        success: true,
        data: note
    });
});

// @desc    Obtenir toutes les notes avec filtres
// @route   GET /api/v1/notes
// @access  Private
exports.getNotes = asyncHandler(async (req, res, next) => {
    const { classe, matiere, eleve, periode, statut, professeur } = req.query;

    let query = {};

    // Filtres
    if (classe) query.classe = classe;
    if (matiere) query.matiere = matiere;
    if (eleve) query.eleve = eleve;
    if (periode) query.periode = periode;
    if (statut) query.statut = statut;
    if (professeur) query.professeur = professeur;

    // Si professeur, ne voir que ses notes
    if (req.user.role === 'PROFESSEUR') {
        query.professeur = req.user.id;
    }

    const notes = await Note.find(query)
        .populate('eleve', 'nom prenom matricule')
        .populate('matiere', 'nom coefficient')
        .populate('classe', 'niveau section filiere')
        .populate('professeur', 'nom prenom')
        .populate('validePar', 'nom prenom')
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        count: notes.length,
        data: notes
    });
});

// @desc    Obtenir une note par ID
// @route   GET /api/v1/notes/:id
// @access  Private
exports.getNote = asyncHandler(async (req, res, next) => {
    const note = await Note.findById(req.params.id)
        .populate('eleve', 'nom prenom matricule')
        .populate('matiere', 'nom coefficient')
        .populate('classe', 'niveau section filiere')
        .populate('professeur', 'nom prenom')
        .populate('validePar', 'nom prenom');

    if (!note) {
        return next(new ErrorResponse('Note non trouvée', 404));
    }

    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Mettre à jour une note
// @route   PUT /api/v1/notes/:id
// @access  Private (Professeur)
exports.updateNote = asyncHandler(async (req, res, next) => {
    let note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse('Note non trouvée', 404));
    }

    // Vérifier que c'est le professeur qui a créé la note
    if (note.professeur.toString() !== req.user.id && req.user.role !== 'ADMIN') {
        return next(new ErrorResponse('Non autorisé à modifier cette note', 403));
    }

    // Ne pas permettre la modification si la note est validée
    if (note.statut === 'VALIDEE') {
        return next(new ErrorResponse('Impossible de modifier une note validée', 400));
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate(['eleve', 'matiere', 'classe', 'professeur']);

    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Supprimer une note
// @route   DELETE /api/v1/notes/:id
// @access  Private (Professeur/Admin)
exports.deleteNote = asyncHandler(async (req, res, next) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse('Note non trouvée', 404));
    }

    // Vérifier les permissions
    if (note.professeur.toString() !== req.user.id && req.user.role !== 'ADMIN') {
        return next(new ErrorResponse('Non autorisé à supprimer cette note', 403));
    }

    // Ne pas permettre la suppression si validée
    if (note.statut === 'VALIDEE') {
        return next(new ErrorResponse('Impossible de supprimer une note validée', 400));
    }

    await note.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Valider une note (Censeur)
// @route   POST /api/v1/notes/:id/validate
// @access  Private (Censeur/Admin)
exports.validateNote = asyncHandler(async (req, res, next) => {
    // Vérifier le rôle
    if (req.user.role !== 'CENSEUR' && req.user.role !== 'ADMIN') {
        return next(new ErrorResponse('Seul le censeur peut valider les notes', 403));
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse('Note non trouvée', 404));
    }

    // Vérifier qu'il y a au moins une note
    if (!note.notes || note.notes.length === 0) {
        return next(new ErrorResponse('Aucune note à valider', 400));
    }

    // Calculer la moyenne
    note.moyenne = note.calculerMoyenne();
    note.statut = 'VALIDEE';
    note.validePar = req.user.id;
    note.dateValidation = Date.now();

    await note.save();
    await note.populate(['eleve', 'matiere', 'classe', 'professeur', 'validePar']);

    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Rejeter une note (Censeur)
// @route   POST /api/v1/notes/:id/reject
// @access  Private (Censeur/Admin)
exports.rejectNote = asyncHandler(async (req, res, next) => {
    const { motif } = req.body;

    // Vérifier le rôle
    if (req.user.role !== 'CENSEUR' && req.user.role !== 'ADMIN') {
        return next(new ErrorResponse('Seul le censeur peut rejeter les notes', 403));
    }

    if (!motif) {
        return next(new ErrorResponse('Le motif de rejet est requis', 400));
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse('Note non trouvée', 404));
    }

    note.statut = 'REJETEE';
    note.motifRejet = motif;
    note.validePar = req.user.id;
    note.dateValidation = Date.now();

    await note.save();
    await note.populate(['eleve', 'matiere', 'classe', 'professeur', 'validePar']);

    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Obtenir les notes en attente de validation
// @route   GET /api/v1/notes/pending
// @access  Private (Censeur/Admin)
exports.getPendingNotes = asyncHandler(async (req, res, next) => {
    // Vérifier le rôle
    if (req.user.role !== 'CENSEUR' && req.user.role !== 'ADMIN') {
        return next(new ErrorResponse('Accès non autorisé', 403));
    }

    // Construire le filtre
    const filter = { statut: 'EN_ATTENTE' };

    // Ajouter les filtres optionnels
    if (req.query.classe) filter.classe = req.query.classe;
    if (req.query.matiere) filter.matiere = req.query.matiere;
    if (req.query.periode) filter.periode = req.query.periode;

    const notes = await Note.find(filter)
        .populate('eleve', 'nom prenom matricule')
        .populate('matiere', 'nom coefficient')
        .populate('classe', 'niveau section filiere')
        .populate('professeur', 'nom prenom')
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        count: notes.length,
        data: notes
    });
});

// @desc    Soumettre des notes pour validation
// @route   POST /api/v1/notes/:id/submit
// @access  Private (Professeur)
exports.submitNote = asyncHandler(async (req, res, next) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse('Note non trouvée', 404));
    }

    // Vérifier que c'est le professeur qui a créé la note
    if (note.professeur.toString() !== req.user.id) {
        return next(new ErrorResponse('Non autorisé', 403));
    }

    // Vérifier qu'il y a 3 notes
    if (note.notes.length !== 3) {
        return next(new ErrorResponse('Vous devez saisir exactement 3 notes avant de soumettre', 400));
    }

    // Le statut reste EN_ATTENTE mais on peut ajouter un flag
    note.statut = 'EN_ATTENTE';
    await note.save();

    await note.populate(['eleve', 'matiere', 'classe', 'professeur']);

    res.status(200).json({
        success: true,
        message: 'Notes soumises pour validation',
        data: note
    });
});
