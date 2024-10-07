const bcrypt = require('bcrypt');
const db = require('../db');

// Controller to add a new driver (mobile user)
const addDriver = async (req, res) => {
    const { username, email, password, phone_no, status } = req.body;
  
    if (!username || !email || !password || !phone_no) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const driverStatus = status || 'Available'; // Default status is 'Available'
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `INSERT INTO DRIVERS (USERNAME, EMAIL, PASSWORD, PHONE_NO, STATUS) VALUES (?, ?, ?, ?, ?)`;
      db.query(query, [username, email, hashedPassword, phone_no, driverStatus], (err, result) => {
        if (err) {
          console.error('Error adding driver:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ message: 'Driver added successfully' });
      });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  };
  
  const getDrivers = (req, res) => {
    const query = 'SELECT DRIVER_ID, USERNAME, EMAIL, PHONE_NO, STATUS FROM DRIVERS';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching drivers:', err);
        return res.status(500).json({ error: 'Error fetching drivers' });
      }
  
      return res.status(200).json(results);
    });
  };

  const deleteDriver = (req, res) => {
    const { driverId } = req.params;
  
    const query = 'DELETE FROM DRIVERS WHERE DRIVER_ID = ?';
    
    db.query(query, [driverId], (err, result) => {
      if (err) {
        console.error('Error deleting driver:', err);
        return res.status(500).json({ error: 'Failed to delete driver' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Driver not found' });
      }
  
      return res.status(200).json({ message: 'Driver deleted successfully' });
    });
  };
  
  module.exports = {
    addDriver,
    getDrivers,
    deleteDriver
  };
  

