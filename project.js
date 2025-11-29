const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Project description is required']
    },
    technologies: [{
        type: String,
        trim: true
    }],
    imageUrl: {
        type: String,
        default: ''
    },
    liveUrl: {
        type: String,
        default: ''
    },
    githubUrl: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'fullstack', 'other'],
        default: 'web'
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'planned'],
        default: 'completed'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);