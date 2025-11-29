const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { authenticateAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Admin routes
router.post('/', authenticateAdmin, createProject);
router.put('/:id', authenticateAdmin, updateProject);
router.delete('/:id', authenticateAdmin, deleteProject);

module.exports = router;