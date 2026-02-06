require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Grade = require('./models/Grade');
const ClasseMatiere = require('./models/ClasseMatiere');

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // 1. Find all Professors
        const profs = await User.find({ role: 'PROFESSEUR' });
        console.log(`Found ${profs.length} professors.`);

        for (const prof of profs) {
            console.log(`\nChecking Prof: ${prof.prenom} ${prof.nom} (${prof.email})`);
            const assignments = await ClasseMatiere.find({ professeur: prof._id })
                .populate('classe', 'niveau section')
                .populate('matiere', 'nom');

            console.log(`- Assignments: ${assignments.length}`);

            for (const assign of assignments) {
                const { classe, matiere } = assign;
                if (!classe || !matiere) continue;

                const grades = await Grade.find({
                    classe: classe._id,
                    matiere: matiere._id
                });

                const students = await User.countDocuments({ classe: classe._id, role: 'ELEVE' });

                console.log(`  > ${classe.niveau} ${classe.section} - ${matiere.nom}`);
                console.log(`    Students: ${students}`);
                console.log(`    Grades: ${grades.length}`);
                if (grades.length > 0) {
                    console.log('    Sample Grade Statut:', grades[0].statut);
                    console.log('    Sample Grade Periode:', grades[0].periode);
                }
            }
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkData();
