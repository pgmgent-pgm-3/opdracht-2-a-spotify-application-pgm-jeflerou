import { getConnection } from 'typeorm';

export const home = async (req, res, next) => {
  try {
    const playlistRepository = getConnection().getRepository('Playlist');
    const artistRepository = getConnection().getRepository('Artist');
    const songRepository = getConnection().getRepository('Song');

    const playlists = await playlistRepository.find();
    const artists = await artistRepository.find();
    const songs = await songRepository.find();

    res.render('home', { playlists, artists, songs });
  } catch (e) {
    next(e.message);
  }
};
