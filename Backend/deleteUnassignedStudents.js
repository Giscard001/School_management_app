const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/lebian')
    .then(async () => {
        console.log('Connected to MongoDB\n');

        // Find all students
        const students = await User.find({ role: 'ELEVE' });

        console.log(`Total students: ${students.length}\n`);

        if (students.length > 0) {
            console.log('=== LIST OF STUDENTS ===\n');
            students.forEach((s, i) => {
                console.log(`${i + 1}. ${s.prenom} ${s.nom}`);
                console.log(`   Email: ${s.email}`);
                console.log(`   Matricule: ${s.matricule || 'N/A'}`);
                console.log(`   Classe: ${s.classe || 'Non affecté'}`);
                console.log(`   ID: ${s._id}\n`);
            });

            // Delete all students without class
            const unassigned = students.filter(s => !s.classe);
            if (unassigned.length > 0) {
                console.log(`\n🗑️  Deleting ${unassigned.length} unassigned student(s)...\n`);
                await User.deleteMany({ role: 'ELEVE', classe: null });
                console.log('✅ Unassigned students deleted\n');
            }
        } else {
            console.log('No students found in database.\n');
        }

        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
