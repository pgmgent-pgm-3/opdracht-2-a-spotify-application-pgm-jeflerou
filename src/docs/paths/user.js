/**
 * The user paths
 */

import userResponse from '../responses/user.js';

export default {
  '/users': {
    summary: 'Gets all the users',
    description: 'Gets all the users in database ...',
    get: {
      tags: ['Users'],
      responses: userResponse,
    },
  },
};
