const displayGame = async (req, res) => {
  const { gameId } = req.params;
  res.render('game', { gameId });
};

module.exports = {
  displayGame,
};
