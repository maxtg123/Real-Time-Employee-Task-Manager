const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});


const authRoutes = require('./routes/authRoutes');
const phoneAuthRoutes = require('./routes/phoneAuthRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/phone-auth', phoneAuthRoutes); 
app.use('/api/employees', employeeRoutes);
app.use('/api/users', userRoutes);

const userSocketMap = new Map();

io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  socket.on('register_user', (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(` Mapped userId ${userId} to socketId ${socket.id}`);
  });

  socket.on('send_message', ({ from, to, message }) => {
    const receiverSocketId = userSocketMap.get(to);
    console.log(`📤 Message from ${from} to ${to}:`, message);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', { from, to, message });
    } else {
      console.log(`⚠️ No socket found for userId: ${to}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(' User disconnected:', socket.id);
    for (const [userId, sockId] of userSocketMap.entries()) {
      if (sockId === socket.id) {
        userSocketMap.delete(userId);
        console.log(` Removed userId ${userId} from socket map`);
        break;
      }
    }
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
