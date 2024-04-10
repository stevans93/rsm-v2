require('dotenv').config();

module.exports = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    MEDIA_LOCATION: process.env.MEDIA_LOCATION,
    CORS_OPTIONS: {
        origin: (origin, callback) => {
            // if(whiteList.includes(origin)) {
            //     // callback(null, true);
            // } else {
            //     // callback(new Error("Not Allowed By Cors!"));
            // }
            callback(null, true);
        }
    }
}