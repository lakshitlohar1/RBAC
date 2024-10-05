import { io } from 'socket.io-client';

// Initialize socket connection
const socket = io(process.env.SOCKET_SERVER_URL || 'http://localhost:5000', {
  transports: ['websocket'], // Use WebSocket transport for better performance
});

// Handle connection and disconnection
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

// Subscribe to notifications
export const subscribeToNotifications = (callback) => {
  socket.on('notification', (message) => {
    callback(message);
  });
};

// Send a notification
export const sendNotification = (message) => {
  try {
    socket.emit('notification', message);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Clean up when component unmounts
export const unsubscribeFromNotifications = (callback) => {
  socket.off('notification', callback);
};

// Optionally export the socket for direct access if needed
export default socket;
