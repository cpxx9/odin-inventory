const { Router } = require('express');
const { displayGenre, createGenre } = require('../controllers/genreController');

const genreRouter = Router();

genreRouter.get('/:genreId', displayGenre);
genreRouter.post('/', createGenre);

module.exports = {
  genreRouter,
};
