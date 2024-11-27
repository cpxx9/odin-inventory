const db = require('../models/queries');

const displayGenre = async (req, res) => {
  const { genreId } = req.params;
  const genre = await db.getGenre(genreId);
  const queryGenreGames = await db.getGamesFromGenre(genreId);
  res.render('genre', { genre, queryGenreGames });
};

const createGenre = async (req, res) => {
  const { newGenre } = req.body;
  await db.createGenre(newGenre);
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
