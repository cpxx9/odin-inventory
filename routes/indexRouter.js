const { Router } = require('express');
const { displayCategories } = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', displayCategories);

module.exports = {
  indexRouter,
};
