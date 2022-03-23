/* eslint-disable prettier/prettier */
/**
 * Our API schemas
 */

export default {
  'User': {
    properties: {
      id: {
        type: 'int',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role'
      }
    },
  },
  'UserInput': {
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
    example: {
      email: 'adalovelace@gmail.com',
      password: 'test123',
      user_meta: {
        firstName: 'Ada',
        lastName: 'Lovelace',
        userName: 'Love',
        avatar: 'link',
      },
      role: {
        label: 'admin',
      },
    }
  },
  'UserMeta': {
    properties: {
      id: {
        type: 'int',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      userName: {
        type: 'string',
      },
      avatar: {
        type: 'string',
      }
    }
  },
  'Role': {
    properties: {
      id: {
        type: 'int',
      },
      label: {
        type: 'string',
      },
    }
  },
  'Artist': {
    properties: {
      id: {
        type: 'int',
      },
      name: {
        type: 'string',
      },
      albums: {
        $ref: '#/components/schemas/Album'
      }
    },
  },
  'Album': {
    properties: {
      id: {
        type: 'int',
      },
      name: {
        type: 'string',
      },
      artists: {
        $ref: '#/components/schemas/Artist',
      },
    }
  },
  'Song': {
    properties: {
      id: {
        type: 'int',
      },
      name: {
        type: 'string',
      },
      artists: {
        $ref: '#/components/schemas/Artist'
      }
    }
  },
  'Playlist': {
    properties: {
      id: {
        type: 'int',
      },
      name: {
        type: 'string',
      },
    }
  }
};
