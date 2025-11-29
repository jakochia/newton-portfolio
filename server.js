require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Route imports
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Portfolio Backend API is running!',
        version: '1.0.0',
        endpoints: {
            projects: '/api/projects',
            auth: '/api/auth',
            contact: '/api/contact'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🎯 Server running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Base URL: http://localhost:${PORT}`);
});