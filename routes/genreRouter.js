const { Router } = require('express');
const { displayGenre } = require('../controllers/genreController');

const genreRouter = Router();

genreRouter.get('/:genre', displayGenre);

module.exports = {
  genreRouter,
};
