
        require('dotenv').config();

        const config = {
        env: process.env.NODE_ENV || 'DEFAULT', // CHANGE DEFAULT TO YOUR ENVIRONMENT
        port: process.env.DB_PORT || 3000, // API PORT
        dbUser:  process.env.DB_USER,
        dbPassword:  process.env.DB_PASSWORD,
        dbHost:  process.env.DB_HOST,
        dbName:  process.env.DB_NAME,
        dbPort:  process.env.DB_PORT,
        }

        module.exports = { config };
        