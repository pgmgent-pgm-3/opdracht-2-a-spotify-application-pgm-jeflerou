/**
 * The song paths
 */

import songResponse from '../responses/index.js';

export default {
  '/songs': {
    summary: 'Gets all the songs',
    description: 'Gets all the songs in database ...',
    get: {
      tags: ['Songs'],
      responses: songResponse,
    },
  },
  '/song/:id': {
    summary: 'Gets a single song',
    description: 'Gets a single song based on the provided id ...',
    get: {
      tags: ['Songs'],
      responses: songResponse,
    },
  },
};
