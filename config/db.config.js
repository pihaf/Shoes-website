require('dotenv/config')

module.exports = {
    HOST: process.env.DB_HOST,
    NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.DB_PORT
}