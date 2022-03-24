/**
 * The API user controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;
export const addArtist = async (req, res, next) => {
  try {
  } catch (e) {
    next(e.message);
  }
};
