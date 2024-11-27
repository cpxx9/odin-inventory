const pool = require('./pool');

async function getAllGenres() {
  const { rows } = await pool.query('SELECT * FROM genre');
  return rows;
}

async function getGenre(genreId) {
  const { rows } = await pool.query(
    'SELECT genre.genre FROM genre WHERE genre.genre_id = $1',
    [genreId]
  );
  return rows[0].genre;
}

async function getGamesFromGenre(genreId) {
  const { rows } = await pool.query(
    `
    SELECT game.title, game.game_id
    FROM genre
    LEFT JOIN game_genre
    ON game_genre.genre_id = genre.genre_id
    INNER JOIN game
    ON game.game_id = game_genre.game_id 
    WHERE genre.genre_id = $1
  `,
    [genreId]
  );
  return rows;
}

async function getGameInfo(gameId) {
  // to build upon
  return gameId;
}

module.exports = {
  getAllGenres,
  getGenre,
  getGamesFromGenre,
  getGameInfo,
};
