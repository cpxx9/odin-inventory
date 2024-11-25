#! /usr/bin/env node
require('dotenv/config');
const { Client } = require('pg');
const { argv } = require('node:process');

const connectionString =
  argv[2] ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const SQL = `
CREATE TABLE IF NOT EXISTS top_gameinv.genre(
  genre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR ( 100 ),
  CONSTRAINT genre_pkey PRIMARY KEY (genre_id)
);

CREATE TABLE IF NOT EXISTS top_gameinv.studio(
  studio_id INTEGER GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  CONSTRAINT studio_pkey PRIMARY KEY (studio_id)
);

CREATE TABLE IF NOT EXISTS top_gameinv.game(
  game_id INTEGER GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  genre_id INTEGER NOT NULL,
  CONSTRAINT game_pkey PRIMARY KEY (game_id),
  CONSTRAINT game_genre_id_fkey FOREIGN KEY (genre_id)
    REFERENCES top_gameinv.genre (genre_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT
);


CREATE TABLE IF NOT EXISTS top_gameinv.game_studio(
  game_id INTEGER NOT NULL,
  studio_id INTEGER NOT NULL,
  CONSTRAINT game_studio_pkey PRIMARY KEY (game_id, studio_id),
  CONSTRAINT game_studio_game_id_fkey FOREIGN KEY (game_id)
    REFERENCES top_gameinv.game (game_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT,
  CONSTRAINT game_studio_studio_id_fkey FOREIGN KEY (studio_id)
    REFERENCES top_gameinv.studio (studio_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT,
);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
