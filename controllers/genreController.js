const displayGenre = async (req, res) => {
  const { genre } = req.params;
  res.render('genre', { genre });
};

module.exports = {
  displayGenre,
};
