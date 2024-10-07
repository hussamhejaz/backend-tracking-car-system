const express = require('express');
const router = express.Router();
const { addDriver , getDrivers, deleteDriver } = require('../controllers/userController');

// Route to add a driver
router.post('/addDriver', addDriver);
router.get('/getDrivers', getDrivers);
router.delete('/deleteDriver/:driverId', deleteDriver);

module.exports = router;
