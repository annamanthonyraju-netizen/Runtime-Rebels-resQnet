import { Server } from 'socket.io';
import { ENV } from '../config/env.js';

let io = null;

export const initSockets = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: ENV.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO Connection] Client connected: ${socket.id}`);

    // Join role-based rooms (citizen, officer, volunteer, admin)
    socket.on('join-role-room', (role) => {
      const room = `role:${(role || 'citizen').toLowerCase()}`;
      socket.join(room);
      console.log(`[Socket.IO Room] Socket ${socket.id} joined ${room}`);
    });

    // Join incident specific room
    socket.on('join-incident-room', (incidentId) => {
      const room = `incident:${incidentId}`;
      socket.join(room);
      console.log(`[Socket.IO Room] Socket ${socket.id} joined ${room}`);
    });

    // Handle online status toggle (Available, Busy, Offline)
    socket.on('user-status-changed', (data) => {
      io.emit('user-status-updated', data);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`[Socket.IO Disconnect] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const initSocket = initSockets;

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

// Emit Incident Created event across Officer, Admin, and Map
export const emitIncidentCreated = (incident) => {
  if (io) {
    io.to('role:officer').to('role:admin').emit('incident-created', incident);
    io.emit('new-incident', incident); // GIS Map listener
  }
};

// Emit Incident Updated event
export const emitIncidentUpdated = (incident) => {
  if (io) {
    io.to(`incident:${incident._id}`).to('role:officer').to('role:admin').emit('incident-updated', incident);
  }
};

// Emit Real-Time Notification Toast
export const emitNotification = (role, notification) => {
  if (io) {
    io.to(`role:${role.toLowerCase()}`).emit('notification-created', notification);
  }
};
