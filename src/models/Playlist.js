/**
 * Our playlist
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Playlist',
  tableName: 'play_lists',
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
    songs: {
      target: 'Song',
      type: 'many-to-many',
      joinTable: true,
    },
    users: {
      target: 'User',
      type: 'many-to-many',
      joinTable: true,
    },
  }
})