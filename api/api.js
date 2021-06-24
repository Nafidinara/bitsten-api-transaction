/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');
const emailMiddleware = require('./policies/email.policy');

require('dotenv').config();

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
//const aa = mapRoutes(config.publicRoutes, 'api/controllers/');
//const bb = mapRoutes(config.privateRoutes, 'api/controllers/');
const cc = mapRoutes(config.transactionRoutes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// secure your private routes with jwt authentication middleware
app.all('/transaction/auth/*', (req, res, next) => auth(req, res, next));
app.all('/transaction/auth/withdraw', (req, res, next) => emailMiddleware(req, res, next));



app.get('/', function (req, res) {
  res.send('Welcome to Bitsten API')
});

// fill routes for express application
//app.use('/public', aa);
// app.use('/private', bb);

app.use('/transaction', cc);


app.get('/transaction/*', function(req, res){
  res.send({
status : false,
message : "Only POST allowed"
  });
});


app.all('*', function(req, res){
  res.send({
status : false,
message : "error 404 "
  });
});



server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  console.log(`Server bitsten is running on port ${config.port}.`);
  return DB;
});
