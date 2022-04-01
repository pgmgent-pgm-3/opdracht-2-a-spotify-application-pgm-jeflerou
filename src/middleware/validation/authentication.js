/**
 * The authentication validators
 */

import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .withMessage('E-mail is een verplicht veld.')
    .bail()
    .isEmail()
    .withMessage('E-mail is niet juist.'),
  body('password')
    .isLength({
      min: 6,
    })
    .withMessage('Wachtwoord moet minstens 6 karakters lang zijn.'),
  body('firstName').notEmpty().withMessage('firstName is een verplicht veld.'),
  body('lastName').notEmpty().withMessage('lastName is een verplicht veld.'),
  body('userName').notEmpty().withMessage('E-mail is een verplicht veld.'),
  // TODO need to add middleware to make sure role is admin, reader, editor
  body('role').notEmpty().withMessage('E-mail is een verplicht veld.'),
];
