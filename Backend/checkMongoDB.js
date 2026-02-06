const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lebian')
    .then(async () => {
        console.log('Connected to MongoDB\n');

        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('=== ALL COLLECTIONS ===');
        collections.forEach(c => console.log(`- ${c.name}`));

        // Check evaluations collection directly
        const db = mongoose.connection.db;
        const evalsCollection = db.collection('evaluations');
        const allEvals = await evalsCollection.find({}).toArray();

        console.log(`\n=== EVALUATIONS COLLECTION (${allEvals.length}) ===`);
        allEvals.forEach(e => {
            console.log(`\nID: ${e._id}`);
            console.log(`  Titre: ${e.titre}`);
            console.log(`  Statut: ${e.statut}`);
            console.log(`  Professeur ID: ${e.professeur}`);
            console.log(`  Date: ${e.date}`);
            console.log(`  Full object:`, JSON.stringify(e, null, 2));
        });

        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
