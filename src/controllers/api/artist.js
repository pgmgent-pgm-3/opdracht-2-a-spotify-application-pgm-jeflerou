/**
 * The API user controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;
export const addArtist = async (req, res, next) => {
  try {
    // validate the incoming id
    if (!req.body.name) throw new Error('Please provide a name for the artist');

    // get the artist repository
    const artistRepository = getConnection().getRepository('Artist');

    const artist = await artistRepository.findOne({
      where: {
        name: req.body.name,
      },
    });

    // check if the artists already exists
    if (artist) {
      req.status(400).json({
        status: `there already exists an artist under the name: ${req.body.name}.`,
      });
    }

    artistRepository.save({
      name: req.body.name,
    });
  } catch (e) {
    next(e.message);
  }
};
