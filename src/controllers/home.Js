import { getConnection } from 'typeorm';

export const home = async (req, res, next) => {
  try {
    const playlistRepository = getConnection().getRepository('Playlist');
    const artistRepository = getConnection().getRepository('Artist');

    const playlists = await playlistRepository.find();
    const artists = await artistRepository.find();

    res.render('home', { playlists, artists });
  } catch (e) {
    next(e.message);
  }
};
