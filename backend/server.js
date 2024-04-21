const express = require('express');
const cors = require('cors');
const fs = require('fs')
const mongoose = require('mongoose');
const { DB_URL, PORT, CORS_OPTIONS, NODE_ENV } = require('./config/config');
const server = express();

server.use(cors(NODE_ENV === 'development' ? CORS_OPTIONS.corsOptionsDev : CORS_OPTIONS.corsOptionsProd));

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(error);
    });


fs.mkdirSync(process.env.MEDIA_LOCATION, { recursive: true });

server.use(express.static(process.env.MEDIA_LOCATION));

server.use(express.json({ limit: '10mb' }));

server.use('/api', require('./routes'))

server.listen(PORT, () => {
    console.log('Server Port 4000');
});