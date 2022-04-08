/**
 * The API song controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;
export const addSong = async (req, res, next) => {
  try {
    // validate the incoming body
    if (!req.body.name) throw new Error('Please provide a name for the song');

    // get the song repository
    const songRepository = getConnection().getRepository('Song');

    const song = await songRepository.findOne({
      where: {
        name: req.body.name,
      },
    });

    // check if the song already exists
    if (song) {
      req.status(400).json({
        status: `there already exists a song with the name: ${req.body.name}.`,
      });
    }

    songRepository.save({
      name: req.body.name,
    });
  } catch (e) {
    next(e.message);
  }
};
