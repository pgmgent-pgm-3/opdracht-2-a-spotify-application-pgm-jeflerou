/**
 * The artist paths
 */

import artistResponse from '../responses/index.js';

export default {
  '/artists': {
    summary: 'Gets all the artists',
    description: 'Gets all the artists in database ...',
    get: {
      tags: ['Artists'],
      responses: artistResponse,
    },
  },
  '/artist/:id': {
    summary: 'Gets a single artist',
    description: 'Gets a single artist based on the provided id ...',
    get: {
      tags: ['Artists'],
      responses: artistResponse,
    },
  },
};
