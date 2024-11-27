#! /usr/bin/env node
require('dotenv/config');
const { Client } = require('pg');
const { argv } = require('node:process');

const connectionString =
  argv[2] ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const SQL = `
CREATE TABLE IF NOT EXISTS genre(
  genre_id INTEGER GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR ( 100 ) UNIQUE,
  last_update timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT genre_pkey PRIMARY KEY (genre_id)
);

CREATE TABLE IF NOT EXISTS studio(
  studio_id INTEGER GENERATED ALWAYS AS IDENTITY,
  studio VARCHAR ( 255 ) UNIQUE,
  last_update timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT studio_pkey PRIMARY KEY (studio_id)
);

CREATE TABLE game(
  game_id INTEGER GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  last_update timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT game_pkey PRIMARY KEY (game_id)
);

CREATE TABLE IF NOT EXISTS game_studio(
  game_id INTEGER NOT NULL,
  studio_id INTEGER NOT NULL,
  last_update timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT game_studio_pkey PRIMARY KEY (game_id, studio_id),
  CONSTRAINT game_studio_game_id_fkey FOREIGN KEY (game_id)
    REFERENCES game (game_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT,
  CONSTRAINT game_studio_studio_id_fkey FOREIGN KEY (studio_id)
    REFERENCES studio (studio_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS game_genre(
  game_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  last_update timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT game_genre_pkey PRIMARY KEY (game_id, genre_id),
  CONSTRAINT game_genre_game_id_fkey FOREIGN KEY (game_id)
    REFERENCES game (game_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT,
  CONSTRAINT game_genre_genre_id_fkey FOREIGN KEY (genre_id)
    REFERENCES genre (genre_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT
);

INSERT INTO genre (genre)
VALUES
  ('RPG'),
  ('Shooter'),
  ('Strategy');

INSERT INTO game (title)
VALUES
  ('Zelda'),
  ('Call of Duty: Black ops'),
  ('Call of Duty: Modern Warfare'),
  ('Pokemon');

INSERT INTO studio (studio)
VALUES
  ('Nintendo'),
  ('Game Freak'),
  ('InfinityWard'),
  ('Treyarch');

INSERT INTO game_studio (game_id, studio_id)
VALUES
  (1,1),
  (2,4),
  (3,3),
  (4,1),
  (4,2);

INSERT INTO game_genre (game_id, genre_id)
VALUES
  (1,1),
  (1,3),
  (2,2),
  (3,2),
  (4,1),
  (4,3);
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
