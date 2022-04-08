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

export const updateSong = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.id)
      throw new Error('Please provide an id for the song you want to update');

    // get the song repository
    const songRepository = getConnection().getRepository('Song');

    const song = await songRepository.findOne({
      where: {
        id: req.body.id,
      },
    });

    // check if the user provided valid properties
    const validProperties = ['id', 'name', 'artist', 'playlist', 'album'];
    const unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (property) => !validProperties.includes(property)
    );
    if (unwantedProperties.length !== 0)
      throw new Error(
        `You gave a property that isn't defined: ${unwantedProperties.join(
          ', '
        )}.`
      );

    // check if the song exists
    if (!song) {
      req.status(400).json({
        status: `there is no song with the id: ${req.body.id}.`,
      });
    }

    songRepository.save({
      ...song,
      ...req.body,
    });
  } catch (e) {
    next(e.message);
  }
};
