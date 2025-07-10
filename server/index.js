const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const blockchainRoutes = require('./routes/blockchain');

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', blockchainRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🟢 Backend is running.');
});

// ✅ Use dynamic port from environment
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
