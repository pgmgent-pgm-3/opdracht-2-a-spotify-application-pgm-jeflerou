/**
 * The user paths
 */

import userResponse from '../responses/index.js';

export default {
  '/users': {
    summary: 'Gets all the users',
    description: 'Gets all the users in database ...',
    get: {
      tags: ['Users'],
      responses: userResponse,
    },
  },
  '/user/:id': {
    summary: 'Gets a single user',
    description: 'Gets a single user based on the provided id ...',
    get: {
      tags: ['Users'],
      responses: userResponse,
    },
  },
};
