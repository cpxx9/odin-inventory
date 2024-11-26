const displayCategory = async (req, res) => {
  res.render('category', { title: 'Category' });
};

module.exports = {
  displayCategory,
};
