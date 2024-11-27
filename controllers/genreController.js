const { getGenre } = require('../models/queries');

const displayGenre = async (req, res) => {
  const { genre } = req.params;
  const queryGenre = await getGenre(genre);
  console.log(queryGenre);
  res.render('genre', { genre, queryGenre });
};

module.exports = {
  displayGenre,
};
