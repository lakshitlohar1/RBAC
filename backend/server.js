const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables from .env file
dotenv.config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const progressRoutes = require('./routes/progressRoutes');
const stepRoutes = require('./routes/stepRoutes');

// Create app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', progressRoutes);
app.use('/api/step', stepRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Socket.io (for real-time updates)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example event listener
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
