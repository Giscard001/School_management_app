require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@lebian.com' });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('\n=== ADMIN CREDENTIALS ===');
            console.log('Email: admin@lebian.com');
            console.log('Password: Admin@123');
            console.log('Role: ADMIN');
            console.log('========================\n');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            nom: 'Administrateur',
            prenom: 'Système',
            email: 'admin@lebian.com',
            telephone: '+221 77 123 45 67',
            password: 'Admin@123',
            role: 'ADMIN',
            status: 'ACTIF'
        });

        console.log('✅ Admin user created successfully!');
        console.log('\n=== ADMIN CREDENTIALS ===');
        console.log('Email: admin@lebian.com');
        console.log('Password: Admin@123');
        console.log('Role: ADMIN');
        console.log('Status: ACTIF');
        console.log('========================\n');
        console.log('You can now login with these credentials.');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
