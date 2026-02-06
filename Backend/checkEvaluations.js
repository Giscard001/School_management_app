const mongoose = require('mongoose');
const Evaluation = require('./models/Evaluation');

mongoose.connect('mongodb://localhost:27017/lebian')
    .then(async () => {
        console.log('Connected to MongoDB\n');

        const evaluations = await Evaluation.find()
            .populate('professeur', 'nom prenom')
            .populate('classe', 'niveau section')
            .populate('matiere', 'nom');

        console.log(`=== ALL EVALUATIONS (${evaluations.length}) ===\n`);
        evaluations.forEach(e => {
            const prof = e.professeur ? `${e.professeur.prenom} ${e.professeur.nom}` : 'N/A';
            const classe = e.classe ? `${e.classe.niveau} ${e.classe.section}` : 'N/A';
            const matiere = e.matiere ? e.matiere.nom : 'N/A';
            console.log(`Titre: ${e.titre}`);
            console.log(`  Professeur: ${prof}`);
            console.log(`  Classe: ${classe}`);
            console.log(`  Matière: ${matiere}`);
            console.log(`  Statut: ${e.statut}`);
            console.log(`  Date: ${e.date || 'Non définie'}`);
            console.log(`  ID: ${e._id}\n`);
        });

        const validated = evaluations.filter(e => e.statut === 'VALIDEE');
        const withDate = validated.filter(e => e.date);

        console.log(`Validées: ${validated.length}`);
        console.log(`Validées avec date: ${withDate.length}`);

        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
