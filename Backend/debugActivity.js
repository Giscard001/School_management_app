const mongoose = require('mongoose');
const User = require('./models/User');
const ClasseMatiere = require('./models/ClasseMatiere');
const Evaluation = require('./models/Evaluation');

mongoose.connect('mongodb://localhost:27017/lebian')
    .then(async () => {
        console.log('Connected to MongoDB\n');

        // Check professors
        const professors = await User.find({ role: 'PROFESSEUR' });
        console.log(`=== PROFESSORS (${professors.length}) ===`);
        professors.forEach(p => {
            console.log(`- ${p.prenom} ${p.nom} (ID: ${p._id})`);
        });

        // Check assignments
        const assignments = await ClasseMatiere.find()
            .populate('professeur', 'nom prenom')
            .populate('classe', 'niveau section')
            .populate('matiere', 'nom');
        console.log(`\n=== ASSIGNMENTS (${assignments.length}) ===`);
        assignments.forEach(a => {
            const prof = a.professeur ? `${a.professeur.prenom} ${a.professeur.nom}` : 'N/A';
            const classe = a.classe ? `${a.classe.niveau} ${a.classe.section}` : 'N/A';
            const matiere = a.matiere ? a.matiere.nom : 'N/A';
            console.log(`- ${prof} -> ${matiere} (${classe})`);
        });

        // Check evaluations
        const evaluations = await Evaluation.find()
            .populate('professeur', 'nom prenom');
        console.log(`\n=== EVALUATIONS (${evaluations.length}) ===`);
        evaluations.forEach(e => {
            const prof = e.professeur ? `${e.professeur.prenom} ${e.professeur.nom}` : 'N/A';
            console.log(`- ${e.titre} by ${prof} (Status: ${e.statut})`);
        });

        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
