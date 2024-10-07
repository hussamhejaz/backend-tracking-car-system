const db = require('../db');

// Controller to handle adding a new container
const addContainer = (req, res) => {
  const { container_no, container_type, container_size, contents, status, image_url } = req.body;

  // Check if all required fields are provided
  if (!container_no || !container_type || !container_size || !contents) {
    return res.status(400).json({ error: 'All fields except status and image_url are required' });
  }

  // Default values for optional fields if not provided
  const containerStatus = status || 'In Transit';
  const containerImageUrl = image_url || null;

  // SQL query to insert new container into the database
  const query = `
    INSERT INTO CONTAINERS (CONTAINER_NO, CONTAINER_TYPE, CONTAINER_SIZE, CONTENTS, STATUS, IMAGE_URL)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Execute query to insert container data
  db.query(query, [container_no, container_type, container_size, contents, containerStatus, containerImageUrl], (err, result) => {
    if (err) {
      console.error('Error adding container to database:', err);
      return res.status(500).json({ error: 'Failed to add container to database' });
    }

    // Send success response with inserted container ID
    return res.status(201).json({ message: 'Container added successfully', containerId: result.insertId });
  });
};
const getAllContainers = (req, res) => {
  const query = 'SELECT * FROM CONTAINERS';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching containers from database:', err);
      return res.status(500).json({ error: 'Error fetching containers' });
    }

    return res.status(200).json(results);
  });
};


// Controller to delete a container
const deleteContainer = (req, res) => {
  const { id } = req.params;

  // Check if the ID is provided
  if (!id) {
    return res.status(400).json({ error: 'Container ID is required' });
  }

  // SQL query to delete the container from the database
  const query = 'DELETE FROM CONTAINERS WHERE CONTAINER_ID = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting container from database:', err);
      return res.status(500).json({ error: 'Failed to delete container from database' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Container not found' });
    }

    return res.status(200).json({ message: 'Container deleted successfully' });
  });
};

module.exports = {
  addContainer,
  getAllContainers,
  deleteContainer,
};

