import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import validator from 'express-validator';
import routes from './routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(express.static(path.resolve(__dirname, './../public')));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

routes(app);

const server = http.createServer(app);
server.listen(port);

module.exports = server;
