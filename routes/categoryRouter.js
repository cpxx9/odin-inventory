const { Router } = require('express');
const { displayCategory } = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', displayCategory);

module.exports = {
  categoryRouter,
};
