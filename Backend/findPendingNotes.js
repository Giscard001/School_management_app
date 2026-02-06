// Script pour trouver et supprimer les notes en attente problématiques
const mongoose = require('mongoose');
require('dotenv').config();

const Note = require('./models/Note');
const User = require('./models/User');
const Matiere = require('./models/Matiere');
const Classe = require('./models/Classe');

const findAndCleanPendingNotes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        // Trouver toutes les notes avec statut EN_ATTENTE ou SOUMISE
        const pendingNotes = await Note.find({
            $or: [
                { statut: 'EN_ATTENTE' },
                { statut: 'SOUMISE' }
            ]
        }).populate('eleve', 'nom prenom')
            .populate('matiere', 'nom')
            .populate('classe', 'niveau section');

        console.log(`\n📋 ${pendingNotes.length} note(s) en attente/soumise(s) trouvée(s):\n`);

        for (const note of pendingNotes) {
            console.log(`ID: ${note._id}`);
            console.log(`Élève: ${note.eleve?.prenom} ${note.eleve?.nom}`);
            console.log(`Matière: ${note.matiere?.nom}`);
            console.log(`Classe: ${note.classe?.niveau} ${note.classe?.section}`);
            console.log(`Période: ${note.periode}`);
            console.log(`Statut: ${note.statut}`);
            console.log(`Nombre d'évaluations: ${note.notes?.length || 0}`);
            console.log('---');
        }

        // Demander confirmation pour supprimer
        console.log('\n⚠️  Pour supprimer TOUTES ces notes, relancez le script avec l\'argument "delete"');
        console.log('Exemple: node findPendingNotes.js delete\n');

        if (process.argv[2] === 'delete') {
            const result = await Note.deleteMany({
                $or: [
                    { statut: 'EN_ATTENTE' },
                    { statut: 'SOUMISE' }
                ]
            });
            console.log(`✅ ${result.deletedCount} note(s) supprimée(s)`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
};

findAndCleanPendingNotes();
