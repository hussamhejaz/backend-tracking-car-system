const bcrypt = require('bcrypt');
const db = require('../db');

// Controller to add a new admin (dashboard user)
const addAdmin = async (req, res) => {
  const { username, email, password, factory_id } = req.body;

  if (!username || !email || !password || !factory_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO ADMINS (USERNAME, EMAIL, PASSWORD, FACTORY_ID) VALUES (?, ?, ?, ?)`;
    db.query(query, [username, email, hashedPassword, factory_id], (err, result) => {
      if (err) {
        console.error('Error adding admin:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      return res.status(201).json({ message: 'Admin added successfully' });
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addAdmin };
