import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const home = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.redirect('/login');
    }
    const user = jwt.verify(token, process.env.TOKEN_SALT);

    const playlistRepository = getConnection().getRepository('Playlist');
    const artistRepository = getConnection().getRepository('Artist');
    const songRepository = getConnection().getRepository('Song');
    const albumRepository = getConnection().getRepository('Album');

    const { relations } = songRepository.metadata;
    const relationsArray = relations.map((relation) => relation.propertyName);

    const playlists = await playlistRepository.find();
    const artists = await artistRepository.find();
    const songs = await songRepository.find({
      relations: [...relationsArray],
    });
    const albums = await albumRepository.find();

    res.render('home', {
      playlists,
      artists,
      songs,
      albums,
      user,
    });
  } catch (e) {
    next(e.message);
  }
};
