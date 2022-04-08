/**
 * The API user controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;
export const addArtist = async (req, res, next) => {
  try {
    // validate the incoming body
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

export const updateArtist = async (req, res, next) => {
  try {
    // validate incoming request
    if (!req.body.id)
      throw new Error(
        'Please provide an id for the Artist you want to update.'
      );

    // check if the user provided valid properties
    const validProperties = ['id', 'name'];
    const unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (property) => !validProperties.includes(property)
    );
    if (unwantedProperties.length !== 0)
      throw new Error(
        `You gave a property that isn't defined: ${unwantedProperties.join(
          ', '
        )}.`
      );

    // get the artistRepository
    const artistRepository = getConnection().getRepository('Artist');

    // get the requested artist
    const artist = await artistRepository.findOne({
      where: { id: req.body.id },
    });

    // validate if the artist exists
    if (!artist) throw new Error(`The given artist does not exist`);

    // create updated artist
    const updatedArtist = { ...artist, ...req.body };

    // save the updated artist
    await artistRepository.save(updatedArtist);

    // send back the updated artist id
    res.status(200).json({
      status: `Updated the artist with id:${req.body.id}.`,
    });
  } catch (e) {
    next(e.message);
  }
};
