const { Router } = require('express');
const { displayCategory } = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/:genre', displayCategory);

module.exports = {
  categoryRouter,
};
