const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
const containerRoutes = require('./routes/containerRoutes');
const factoryRoutes = require('./routes/factoryRoutes');
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend's local domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true  // Only if you need to send credentials like cookies
  }));

// Register user routes
app.use('/api/driver', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/containers', containerRoutes);
app.use('/api/factories', factoryRoutes);
// Fallback route for handling 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
