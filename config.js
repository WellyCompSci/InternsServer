require('dotenv').config();

const MONGODB_HOST = process.env.MONGODB_HOST || 'mongodb://127.0.0.1:27017/interns';

const HOST = process.env.HOST || '127.0.0.1';
const APP = process.env.APP || 'dev';
const PORT = process.env.PORT || 3000;

const ROUTE = process.env.ROUTE || '/interns';


module.exports = {
    MONGODB_HOST,
    HOST,
    APP,
    ROUTE,
    PORT
}