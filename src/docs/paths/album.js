/**
 * The album paths
 */

import albumResponse from '../responses/index.js';

export default {
  '/albums': {
    summary: 'Gets all the albums',
    description: 'Gets all the albums in database ...',
    get: {
      tags: ['Albums'],
      responses: albumResponse,
    },
  },
  '/album/:id': {
    summary: 'Gets a single album',
    description: 'Gets a single album based on the provided id ...',
    get: {
      tags: ['Albums'],
      responses: albumResponse,
    },
  },
};
