import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { create } from 'express-handlebars';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';
import { SOURCE_PATH } from './const.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import entities from './models/index.js';
import swaggerDefinition from './docs/swagger.js';
import { getObject } from './controllers/api/object.js';
import { register, postRegister } from './controllers/authentication.js';
import validationAuthentication from './middleware/validation/authentication.js';

const app = express();
app.use(express.static('public'));

/**
 * Import swagger documentation
 */

app.use(
  '/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDefinition)
);

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
 * Handlebars init
 */

const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

/**
 * App routing
 */

app.get('/register', register);
app.post('/register', ...validationAuthentication, postRegister, register);

/**
 * API routing
 */

app.use('/api/users', (req, res, next) => getObject('User', req, res, next));

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
