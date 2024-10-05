const { Server } = require('socket.io');
const http = require('http');
const app = require('../app'); // Import your Express app

// Create HTTP server using the Express app
const server = http.createServer(app);

// Create a new instance of Socket.IO
const io = new Server(server);

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Handle custom events
  socket.on('sendMessage', (data) => {
    // Broadcast message to all connected users
    io.emit('receiveMessage', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Export the server and io instance for use in other parts of your app
module.exports = { server, io };

// Optionally, you can start the server if it's not being done elsewhere
const PORT = process.env.PORT || 3000; // You can specify the port or use an environment variable
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
