const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const audiobookRoutes = require('./routes/audiobooks');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

const mongoUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use audiobook routes
app.use('/api/audiobooks', audiobookRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
