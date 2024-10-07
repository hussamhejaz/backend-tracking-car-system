const db = require('../db');

// Controller to log a new transaction
const logTransaction = (req, res) => {
  const { sender_type, sender_id, receiver_type, receiver_id, container_id, location, note } = req.body;

  // Check if all required fields are provided
  if (!sender_type || !sender_id || !receiver_type || !receiver_id || !container_id || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Step 1: Verify that the container exists
  db.query('SELECT * FROM CONTAINERS WHERE CONTAINER_ID = ?', [container_id], (err, containerResult) => {
    if (err) {
      console.error('Error fetching container:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (containerResult.length === 0) {
      return res.status(400).json({ error: 'Invalid container ID' });
    }

    // Step 2: Verify that the sender exists
    const senderTable = sender_type === 'Driver' ? 'DRIVERS' : 'FACTORIES';
    const senderIdColumn = sender_type === 'Driver' ? 'DRIVER_ID' : 'FACTORY_ID';
    db.query(`SELECT * FROM ${senderTable} WHERE ${senderIdColumn} = ?`, [sender_id], (err, senderResult) => {
      if (err) {
        console.error('Error fetching sender:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (senderResult.length === 0) {
        return res.status(400).json({ error: 'Invalid sender ID' });
      }

      // Step 3: Verify that the receiver exists
      const receiverTable = receiver_type === 'Driver' ? 'DRIVERS' : 'FACTORIES';
      const receiverIdColumn = receiver_type === 'Driver' ? 'DRIVER_ID' : 'FACTORY_ID';
      db.query(`SELECT * FROM ${receiverTable} WHERE ${receiverIdColumn} = ?`, [receiver_id], (err, receiverResult) => {
        if (err) {
          console.error('Error fetching receiver:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        if (receiverResult.length === 0) {
          return res.status(400).json({ error: 'Invalid receiver ID' });
        }

        // Step 4: Insert the transaction into the database
        const query = `INSERT INTO TRANSACTIONS (SENDER_TYPE, SENDER_ID, RECEIVER_TYPE, RECEIVER_ID, CONTAINER_ID, TRANSACTION_LOCATION, NOTE) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [sender_type, sender_id, receiver_type, receiver_id, container_id, location, note], (err, result) => {
          if (err) {
            console.error('Error logging transaction:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          return res.status(201).json({ message: 'Transaction logged successfully' });
        });
      });
    });
  });
};

module.exports = {
  logTransaction
};


const getAllTransactions = (req, res) => {
  const query = 'SELECT * FROM TRANSACTIONS';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      return res.status(500).json({ error: 'Error fetching transactions' });
    }

    return res.status(200).json(results);
  });
};

module.exports = {
  logTransaction,
  getAllTransactions
};
