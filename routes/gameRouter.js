const { Router } = require('express');
const { displayGame } = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get('/:gameId', displayGame);

module.exports = {
  gameRouter,
};
