const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();

const config = {
  migrate: false,
  privateRoutes,
  publicRoutes,
  transactionRoutes,
  port: process.env.PORT || '8080',
};

module.exports = config;
