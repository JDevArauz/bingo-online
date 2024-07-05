
        const express = require('express');
        const dotenv = require('dotenv');
        const cors = require('cors');
        const bodyParser = require('body-parser');
        const cookiesParser = require('cookie-parser');

        dotenv.config();
        const app = express();
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

        app.listen(PORT, () => {
        console.log(`SERVER RUNNING ON PORT ${PORT}`);
        });
        