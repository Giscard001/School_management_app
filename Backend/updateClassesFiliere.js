// Script pour mettre à jour toutes les classes sans filière
const mongoose = require('mongoose');
require('dotenv').config();

const Classe = require('./models/Classe');

const updateClassesFiliere = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        // Trouver toutes les classes sans filière (undefined ou null)
        const classesWithoutFiliere = await Classe.find({
            $or: [
                { filiere: { $exists: false } },
                { filiere: null },
                { filiere: undefined }
            ]
        });

        console.log(`\n📋 ${classesWithoutFiliere.length} classe(s) sans filière trouvée(s):\n`);

        for (const classe of classesWithoutFiliere) {
            console.log(`- ${classe.niveau} ${classe.section} (ID: ${classe._id})`);
        }

        if (classesWithoutFiliere.length === 0) {
            console.log('✅ Toutes les classes ont déjà une filière définie');
            process.exit(0);
        }

        // Demander confirmation
        console.log('\n⚠️  Ces classes seront mises à jour avec filière = "Générale" par défaut');
        console.log('Pour confirmer, relancez avec: node updateClassesFiliere.js confirm\n');

        if (process.argv[2] === 'confirm') {
            const result = await Classe.updateMany(
                {
                    $or: [
                        { filiere: { $exists: false } },
                        { filiere: null },
                        { filiere: undefined }
                    ]
                },
                {
                    $set: { filiere: 'Générale' }
                }
            );

            console.log(`✅ ${result.modifiedCount} classe(s) mise(s) à jour avec filière "Générale"`);

            // Afficher les classes mises à jour
            const updatedClasses = await Classe.find({ filiere: 'Générale' });
            console.log('\n📋 Classes avec filière "Générale":');
            for (const classe of updatedClasses) {
                console.log(`  - ${classe.niveau} ${classe.section}`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
};

updateClassesFiliere();
