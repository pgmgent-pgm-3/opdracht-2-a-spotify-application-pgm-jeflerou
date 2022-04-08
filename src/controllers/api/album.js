/**
 * The API album controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;
export const addAlbum = async (req, res, next) => {
  try {
    // validate the incoming body
    if (!req.body.name)
      throw new Error('Please provide a name for the album you want to create');

    // get the album repository
    const albumRepository = getConnection().getRepository('Album');

    // check if the album already exists
    const album = albumRepository.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (album) {
      req.status(400).json({
        status: `There is already an album with the name:${req.body.name}.`,
      });
    }

    albumRepository.save({
      name: req.body.name,
    });
  } catch (e) {
    next(e.message);
  }
};

export const editAlbum = async (req, res, next) => {
  try {
    // validate the incoming body
    if (!req.body.id)
      throw new Error('Please provide an id for the album you want to edit');

    // get the album repository
    const albumRepository = getConnection().getRepository('Album');

    // make sure the album exists
    const album = albumRepository.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!album) {
      req.status(400).json({
        status: `There is no album with id:${req.body.id}.`,
      });
    }

    albumRepository.save({
      ...album,
      ...req.body,
    });
  } catch (e) {
    next(e.message);
  }
};
