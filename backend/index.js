// Agregar al principio del archivo
let currentNumbers = []; // Números llamados
let players = {}; // Almacenar jugadores

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
const io = socketIo(server, {
  cors: {
    origin: '*', // Permitir todos los orígenes (ajustar según sea necesario en producción)
    methods: ['GET', 'POST'], // Métodos permitidos
    credentials: true, // Permitir cookies
  },
});
const APIRouter = require('./routes');
const PORT = process.env.PORT || 3001;


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
// Socket.IO para actualizaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejar evento de un nuevo jugador
  socket.on('joinGame', (playerName) => {
    players[socket.id] = playerName;
    console.log(`${playerName} se unió al juego`);

    // Emitir lista de jugadores a todos los clientes
    io.emit('playerList', Object.values(players));
  });

  // Manejar evento para llamar un número
  socket.on('callNumber', (number) => {
    currentNumbers.push(number);
    io.emit('numberCalled', number); // Notificar a todos los jugadores
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
    delete players[socket.id]; // Remover jugador
    io.emit('playerList', Object.values(players)); // Actualizar lista de jugadores
  });
});

// API para obtener números llamados
app.get('/api/numbers', (req, res) => {
  res.json({ calledNumbers: currentNumbers });
});

APIRouter(app);


server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
