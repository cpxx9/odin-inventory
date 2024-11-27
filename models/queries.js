const pool = require('./pool');

async function getAllGenres() {
  const { rows } = await pool.query('SELECT * FROM genre');
  return rows;
}

async function getGenre(genre = '%') {
  const { rows } = await pool.query(
    `
    SELECT game.title, game.game_id
    FROM genre
    LEFT JOIN game_genre
    ON game_genre.genre_id = genre.genre_id
    INNER JOIN game
    ON game.game_id = game_genre.game_id WHERE genre.genre LIKE $1
  `,
    [genre]
  );
  return rows;
}

module.exports = {
  getAllGenres,
  getGenre,
};
