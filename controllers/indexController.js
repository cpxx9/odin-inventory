const { getAllCategories } = require('../models/queries');

const displayCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.render('index', { title: 'Best Games', categories });
};

module.exports = {
  displayCategories,
};
