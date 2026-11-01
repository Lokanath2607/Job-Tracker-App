const express = require('express');
const path = require('path'); // Node.js built-in path module
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobroutes');

// Use Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Start local in-memory MongoDB instance
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log('MongoDB Memory Server Connected Successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};

startServer();