const express = require('express');
const router = express.Router();
const { addAdmin } = require('../controllers/adminController');

// Route to add an admin
router.post('/addAdmin', addAdmin);

module.exports = router;
