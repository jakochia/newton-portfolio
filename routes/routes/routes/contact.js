const express = require('express');
const router = express.Router();
const {
    submitContact,
    getContacts,
    updateContactStatus
} = require('../controllers/contactController');
const { authenticateAdmin } = require('../middleware/auth');

// Public route
router.post('/', submitContact);

// Admin routes
router.get('/', authenticateAdmin, getContacts);
router.put('/:id', authenticateAdmin, updateContactStatus);

module.exports = router;