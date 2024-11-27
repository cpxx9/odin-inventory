const { Router } = require('express');
const {
  displayGenre,
  createGenre,
  deleteGenre,
} = require('../controllers/genreController');

const genreRouter = Router();

genreRouter.get('/:genreId', displayGenre);
genreRouter.post('/', createGenre);
genreRouter.post('/delete', deleteGenre);

module.exports = {
  genreRouter,
};
