const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lebian')
    .then(async () => {
        console.log('Connected to MongoDB');

        // Find all students
        const students = await User.find({ role: 'ELEVE' });

        console.log('\n=== ÉLÈVES DANS LA BASE DE DONNÉES ===\n');
        students.forEach((student, index) => {
            console.log(`${index + 1}. ${student.prenom} ${student.nom}`);
            console.log(`   Email: ${student.email}`);
            console.log(`   Matricule: ${student.matricule || 'Non défini'}`);
            console.log(`   Classe: ${student.classe || 'Non affecté'}`);
            console.log(`   ID: ${student._id}`);
            console.log('');
        });

        console.log(`\nTotal: ${students.length} élève(s)\n`);

        // Option to delete test students
        const testEmails = ['eleve1@lebian.com', 'eleve2@lebian.com', 'eleve3@lebian.com', 'eleve4@lebian.com', 'eleve5@lebian.com'];
        const testStudents = students.filter(s => testEmails.includes(s.email));

        if (testStudents.length > 0) {
            console.log('=== ÉLÈVES DE TEST DÉTECTÉS ===\n');
            testStudents.forEach(s => {
                console.log(`- ${s.prenom} ${s.nom} (${s.email})`);
            });

            console.log('\n⚠️  Pour supprimer ces élèves de test, exécutez:');
            console.log('node cleanupTestStudents.js --delete\n');
        }

        // If --delete flag is provided, delete test students
        if (process.argv.includes('--delete')) {
            console.log('\n🗑️  Suppression des élèves de test...\n');
            const result = await User.deleteMany({ email: { $in: testEmails } });
            console.log(`✅ ${result.deletedCount} élève(s) de test supprimé(s)\n`);
        }

        process.exit(0);
    })
    .catch(err => {
        console.error('Erreur de connexion:', err);
        process.exit(1);
    });
