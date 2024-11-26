const { getAllGenres } = require('../models/queries');

const displayGenres = async (req, res) => {
  const genres = await getAllGenres();
  res.render('index', { title: 'Best Games', genres });
};

module.exports = {
  displayGenres,
};
