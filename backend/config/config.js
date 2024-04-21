require('dotenv').config();

module.exports = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    MEDIA_LOCATION: process.env.MEDIA_LOCATION,
    NODE_ENV: process.env.NODE_ENV,
    CORS_OPTIONS: {
        corsOptionsDev: {
            origin: ['http://localhost:5173', '*'],
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE', 'HEAD', 'PATCH'],
        },
        corsOptionsProd: {
            origin: ['https://rsm.digitalhousepower.rs'],
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE', 'HEAD', 'PATCH'],
        },
    }
}