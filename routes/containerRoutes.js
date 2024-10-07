const express = require('express');
const router = express.Router();
const { addContainer, getAllContainers, deleteContainer } = require('../controllers/containerController');

// Route to add a new container
router.post('/addContainer', addContainer);
router.get('/all', getAllContainers);
router.delete('/delete/:id', deleteContainer);
module.exports = router;
