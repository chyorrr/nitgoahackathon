const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// A "middleware" to allow your server to read JSON data
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Read connection string from env so it's easy to override locally
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rafaankhan14:Ch%40chuMachuT%40chu@nit-cluster.igwlqww.mongodb.net/?appName=NIT-cluster";
const mongooseOptions = { serverSelectionTimeoutMS: 5000, family: 4 };

let dbConnected = false;

async function tryConnect() {
  try {
    await mongoose.connect(MONGO_URI, mongooseOptions);
    console.log('Connected to MongoDB!');
    dbConnected = true;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    dbConnected = false;
  }
}

// Try to connect but don't crash the server if it fails (useful for local dev/demo)
tryConnect().finally(() => {
  // If DB connected use real routes, otherwise mount lightweight mock routes so frontend still works
  if (dbConnected) {
    const issueRoutes = require('./routes/issueRoutes');
    app.use('/api/issues', issueRoutes);

    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);
  } else {
    console.log('Using mock routes for /api/issues (MongoDB not connected)');
    const mockIssueRoutes = require('./routes/mockIssueRoutes');
    app.use('/api/issues', mockIssueRoutes);
    // Use mock auth endpoints so registration/login work during dev without Mongo
    const mockAuthRoutes = require('./routes/mockAuthRoutes');
    app.use('/api/auth', mockAuthRoutes);
  }

  // Simple health route
  app.get('/', (req, res) => res.send('CityPulse Backend is running!'));

  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
