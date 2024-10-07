const express = require('express');
const router = express.Router();
const { logTransaction, getAllTransactions } = require('../controllers/transactionController');

// Route to log a transaction
router.post('/logTransaction', logTransaction);
router.get('/getAllTransactions', getAllTransactions);

module.exports = router;
