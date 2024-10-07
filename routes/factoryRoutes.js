// routes/factoryRoutes.js
const express = require('express');
const router = express.Router();
// Corrected import in routes/factoryRoutes.js
const { addFactory, getAllFactories } = require('../controllers/factoryController');


// Route to add a new factory
router.post('/add', addFactory);

// Route to get all factories
router.get('/all', getAllFactories);

module.exports = router;
