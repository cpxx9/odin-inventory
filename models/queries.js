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
  const { rows } = await pool.query(
    `
    SELECT game.title, json_agg(DISTINCT genre.genre) as genres, json_agg(DISTINCT studio.studio) as studios
    FROM game
    INNER JOIN game_genre
    ON game.game_id = game_genre.game_id
    INNER JOIN genre
    ON genre.genre_id = game_genre.genre_id
    INNER JOIN game_studio
    ON game.game_id = game_studio.game_id
    INNER JOIN studio
    on studio.studio_id = game_studio.studio_id
    WHERE game.game_id = $1
    GROUP BY game.title
    `,
    [gameId]
  );
  return rows[0];
}

async function createGenre(genre) {
  await pool.query('INSERT INTO genre (genre) VALUES ($1)', [
    genre.toLowerCase(),
  ]);
}

async function deleteGenre(genreId) {
  await pool.query('DELETE FROM game_genre WHERE genre_id = $1', [genreId]);
  await pool.query('DELETE FROM genre WHERE genre_id = $1', [genreId]);
}

module.exports = {
  getAllGenres,
  getGenre,
  getGamesFromGenre,
  getGameInfo,
  createGenre,
  deleteGenre,
};
