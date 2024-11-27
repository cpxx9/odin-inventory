const {
  getGamesFromGenre,
  getGenre,
  createNewGenre,
} = require('../models/queries');

const displayGenre = async (req, res) => {
  const { genreId } = req.params;
  const genre = await getGenre(genreId);
  const queryGenreGames = await getGamesFromGenre(genreId);
  res.render('genre', { genre, queryGenreGames });
};

const createGenre = async (req, res) => {
  const { newGenre } = req.body;
  await createNewGenre(newGenre);
  res.redirect('/');
};

const deleteGenre = async (req, res) => {
  const { deletedGenre } = req.body;
  console.log(deletedGenre);
  res.redirect('/');
};

module.exports = {
  displayGenre,
  createGenre,
  deleteGenre,
};
