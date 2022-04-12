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

    const playlists = await playlistRepository.find();
    const artists = await artistRepository.find();
    const songs = await songRepository.find();

    res.render('home', { playlists, artists, songs, user });
  } catch (e) {
    next(e.message);
  }
};
