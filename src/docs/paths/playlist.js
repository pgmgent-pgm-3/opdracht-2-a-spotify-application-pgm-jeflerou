/**
 * The playlist paths
 */

import playlistResponse from '../responses/index.js';

export default {
  '/playlists': {
    summary: 'Gets all the playlists',
    description: 'Gets all the playlists in database ...',
    get: {
      tags: ['Playlists'],
      responses: playlistResponse,
    },
  },
  '/playlist/:id': {
    summary: 'Gets a single playlist',
    description: 'Gets a single playlist based on the provided id ...',
    get: {
      tags: ['Playlists'],
      responses: playlistResponse,
    },
  },
};
