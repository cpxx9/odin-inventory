const { Router } = require('express');
const { displayGenres } = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', displayGenres);

module.exports = {
  indexRouter,
};
