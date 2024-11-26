const displayCategories = async (req, res) => {
  res.render('index', { title: 'Best Games' });
};

module.exports = {
  displayCategories,
};
