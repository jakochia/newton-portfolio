require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const admin = new User({
        username: 'admin',
        email: 'admin@yourportfolio.com',
        password: 'admin123',
        role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Admin user created');
    process.exit();
};

createAdmin();