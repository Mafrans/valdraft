import { Database } from "bun:sqlite";

export const db = new Database("db.sql", { create: true });

db.run(`
  create table if not exists Sessions (
    id text not null primary key,
    createdAt integer,
    blueTeamId integer,
    redTeamId integer
  );
`);

db.run(`
  create table if not exists Teams (
    id text not null primary key,
    createdAt integer,
    name varchar(32) not null,
    shortCode varchar(4),
    guest boolean
  );
`);
