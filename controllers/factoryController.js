// controllers/factoryController.js
const db = require('../db');

// Controller to add a new factory
const addFactory = (req, res) => {
  const { factory_name, address, city, country, contact_person, phone_no } = req.body;

  // Check if all required fields are provided
  if (!factory_name || !address || !city || !country) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  const query = `INSERT INTO FACTORIES (FACTORY_NAME, ADDRESS, CITY, COUNTRY, CONTACT_PERSON, PHONE_NO)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [factory_name, address, city, country, contact_person, phone_no], (err, result) => {
    if (err) {
      console.error('Error adding factory to database:', err);
      return res.status(500).json({ error: 'Failed to add factory to the database' });
    }

    return res.status(201).json({ message: 'Factory added successfully' });
  });
};

// Controller to get all factories
const getAllFactories = (req, res) => {
  const query = 'SELECT * FROM FACTORIES';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching factories:', err);
      return res.status(500).json({ error: 'Error fetching factories' });
    }

    return res.status(200).json(results);
  });
};

module.exports = {
  addFactory,
  getAllFactories
};
