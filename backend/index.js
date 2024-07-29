const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookiesParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const APIRouter = require('./routes');
const PORT = process.env.PORT || 3000;


// MIDDLEWARES
const corsOptions = {
  origin: '*', // ALLOW ALL ORIGIN
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // HTTP METHODS ALLOWED
  allowedHeaders: 'Content-Type,Authorization', // HEADERS ALLOWED
  credentials: true, // COOKIES ALLOWED
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookiesParser());

// ROUTES - CHANGE TO YOUR ROUTES
app.get('/api', (req, res) => {
  res.send('API is running!');
});

APIRouter(app);

// Socket.IO para actualizaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
