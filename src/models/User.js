/**
 * Our user
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
  relations: {
    user_meta: {
      target: 'UserMeta',
      type: 'one-to-one',
      cascade: true,
      joinColumn: true,
    },
    role: {
      target: 'Role',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
      inverseSide: 'users',
    },
    playlists: {
      target: 'Playlist',
      type: 'many-to-many',
      joinTable: true,
    },
  },
});
