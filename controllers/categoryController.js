const displayCategory = async (req, res) => {
  const { genre } = req.params;
  res.render('category', { genre });
};

module.exports = {
  displayCategory,
};
