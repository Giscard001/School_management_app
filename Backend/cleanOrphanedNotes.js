// Script pour nettoyer les notes orphelines (notes sans évaluation correspondante)
// À exécuter une seule fois pour corriger le problème actuel

const mongoose = require('mongoose');
require('dotenv').config();

const Note = require('./models/Note');
const NoteColumn = require('./models/NoteColumn');

const cleanOrphanedNotes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        // Trouver toutes les notes avec statut EN_ATTENTE
        const pendingNotes = await Note.find({ statut: 'EN_ATTENTE' });
        console.log(`📋 ${pendingNotes.length} notes en attente trouvées`);

        let orphanedCount = 0;

        for (const note of pendingNotes) {
            // Vérifier si les évaluations référencées existent encore
            let hasOrphanedEvaluations = false;

            for (const noteItem of note.notes) {
                const evaluationExists = await NoteColumn.findById(noteItem.evaluation);
                if (!evaluationExists) {
                    console.log(`⚠️  Évaluation orpheline trouvée: ${noteItem.evaluation} dans note ${note._id}`);
                    hasOrphanedEvaluations = true;
                }
            }

            // Si la note a des évaluations orphelines, la supprimer
            if (hasOrphanedEvaluations) {
                console.log(`🗑️  Suppression de la note orpheline ${note._id}`);
                await Note.findByIdAndDelete(note._id);
                orphanedCount++;
            }
        }

        console.log(`\n✅ Nettoyage terminé: ${orphanedCount} note(s) orpheline(s) supprimée(s)`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
};

cleanOrphanedNotes();
