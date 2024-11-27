const { getGameInfo } = require('../models/queries');

const displayGame = async (req, res) => {
  const { gameId } = req.params;
  const queryGameInfo = await getGameInfo(gameId);
  console.log(queryGameInfo);
  res.render('game', { queryGameInfo });
};

module.exports = {
  displayGame,
};
