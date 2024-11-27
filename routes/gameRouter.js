const { Router } = require('express');
const { displayGame } = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get('/:game', displayGame);

module.exports = {
  gameRouter,
};
