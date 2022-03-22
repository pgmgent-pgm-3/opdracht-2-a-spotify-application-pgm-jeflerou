/**
 * Our song
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Song',
  tableName: 'songs',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    artist: {
      target: 'Artist',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
      inverseSide: 'songs',
    },
    playlists: {
      target: 'Playlist',
      type: 'many-to-many',
      joinTable: true,
    },
  },
});
