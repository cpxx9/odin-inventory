const { Router } = require('express');
const { displayGenre } = require('../controllers/genreController');

const genreRouter = Router();

genreRouter.get('/:genreId', displayGenre);

module.exports = {
  genreRouter,
};
