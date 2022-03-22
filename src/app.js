import express from 'express';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import entities from './models/index.js';

const app = express();
app.use(express.static('public'));

/**
 * Import the body parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Import the cookie parser
 */

app.use(cookieParser());

/**
 * Creates a connection to our database en starts listening
 */

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  // logging: true,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {});
});
