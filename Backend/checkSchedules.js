const mongoose = require('mongoose');
const Schedule = require('./models/Schedule');

mongoose.connect('mongodb://localhost:27017/lebian')
    .then(async () => {
        console.log('Connected to MongoDB\n');

        const schedules = await Schedule.find()
            .populate('professeur', 'nom prenom')
            .populate('classe', 'niveau section')
            .populate('matiere', 'nom');

        console.log(`=== ALL SCHEDULES (${schedules.length}) ===\n`);
        schedules.forEach(s => {
            const prof = s.professeur ? `${s.professeur.prenom} ${s.professeur.nom}` : 'N/A';
            const classe = s.classe ? `${s.classe.niveau} ${s.classe.section}` : 'N/A';
            const matiere = s.matiere ? s.matiere.nom : 'N/A';
            console.log(`Titre: ${s.titre || 'N/A'}`);
            console.log(`  Type: ${s.type || 'N/A'}`);
            console.log(`  Professeur: ${prof}`);
            console.log(`  Classe: ${classe}`);
            console.log(`  Matière: ${matiere}`);
            console.log(`  Jour: ${s.jour || 'N/A'}`);
            console.log(`  Heure: ${s.heureDebut} - ${s.heureFin}`);
            console.log(`  ID: ${s._id}\n`);
        });

        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
