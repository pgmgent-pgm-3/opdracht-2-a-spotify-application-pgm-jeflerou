import express from 'express';
import 'dotenv/config';
import { createConnections } from "typeorm";
import entities from './models/index.js';

const app = express();
app.use(express.static('public'));

/**
 * Creates a connection to our database en starts listening
 */

createConnections({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {});
});