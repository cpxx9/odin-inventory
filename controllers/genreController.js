const { getGamesFromGenre, getGenre } = require('../models/queries');

const displayGenre = async (req, res) => {
  const { genreId } = req.params;
  const genre = await getGenre(genreId);
  const queryGenreGames = await getGamesFromGenre(genreId);
  res.render('genre', { genre, queryGenreGames });
};

module.exports = {
  displayGenre,
};
